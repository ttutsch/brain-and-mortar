-- Brain & Mortar — cross-device sync schema (Phase 2)
-- Paste this whole file into Supabase → SQL Editor → New query → Run.
-- Safe to re-run (idempotent).

create extension if not exists pgcrypto;

-- ── Tables ──────────────────────────────────────────────────────────────────
create table if not exists public.families (
  id         uuid primary key default gen_random_uuid(),
  owner_id   uuid not null references auth.users(id) on delete cascade,
  join_code  text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.family_members (
  family_id  uuid not null references public.families(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  role       text not null default 'member' check (role in ('owner','member')),
  created_at timestamptz not null default now(),
  primary key (family_id, user_id)
);

-- Player profiles + progress are stored as JSON blobs that mirror the app's
-- existing local shapes, so the cloud adapter is a near-direct port of the
-- local one. family_id scopes row access under RLS.
create table if not exists public.profiles (
  id         text primary key,
  family_id  uuid not null references public.families(id) on delete cascade,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.progress (
  profile_id text primary key references public.profiles(id) on delete cascade,
  family_id  uuid not null references public.families(id) on delete cascade,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

create index if not exists profiles_family_idx      on public.profiles(family_id);
create index if not exists progress_family_idx       on public.progress(family_id);
create index if not exists family_members_user_idx   on public.family_members(user_id);

-- ── Membership helper (SECURITY DEFINER → avoids RLS recursion) ──────────────
create or replace function public.is_family_member(fam uuid)
returns boolean language sql security definer stable
set search_path = public as $$
  select exists (
    select 1 from public.family_members m
    where m.family_id = fam and m.user_id = auth.uid()
  );
$$;

-- ── Create / join a family (RPCs the client calls) ──────────────────────────
-- Create a family owned by the current user, with a random join code, and add
-- the owner as its first member. Returns the new family row.
create or replace function public.create_family()
returns public.families language plpgsql security definer
set search_path = public as $$
declare fam public.families; code text;
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  loop
    code := upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6));
    exit when not exists (select 1 from public.families where join_code = code);
  end loop;
  insert into public.families (owner_id, join_code)
    values (auth.uid(), code) returning * into fam;
  insert into public.family_members (family_id, user_id, role)
    values (fam.id, auth.uid(), 'owner');
  return fam;
end; $$;

-- Join an existing family by its code. Adds the current (possibly anonymous)
-- user as a member. Returns the family id.
create or replace function public.join_family(code text)
returns uuid language plpgsql security definer
set search_path = public as $$
declare fam public.families;
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  select * into fam from public.families where join_code = upper(trim(code));
  if fam.id is null then raise exception 'no family with that code'; end if;
  insert into public.family_members (family_id, user_id, role)
    values (fam.id, auth.uid(), 'member')
    on conflict (family_id, user_id) do nothing;
  return fam.id;
end; $$;

-- ── Row-Level Security ──────────────────────────────────────────────────────
alter table public.families       enable row level security;
alter table public.family_members enable row level security;
alter table public.profiles       enable row level security;
alter table public.progress       enable row level security;

drop policy if exists families_select on public.families;
create policy families_select on public.families
  for select using (public.is_family_member(id));
drop policy if exists families_update on public.families;
create policy families_update on public.families
  for update using (owner_id = auth.uid());
drop policy if exists families_delete on public.families;
create policy families_delete on public.families
  for delete using (owner_id = auth.uid());

drop policy if exists members_select on public.family_members;
create policy members_select on public.family_members
  for select using (public.is_family_member(family_id));

drop policy if exists profiles_all on public.profiles;
create policy profiles_all on public.profiles
  for all using (public.is_family_member(family_id))
  with check (public.is_family_member(family_id));

drop policy if exists progress_all on public.progress;
create policy progress_all on public.progress
  for all using (public.is_family_member(family_id))
  with check (public.is_family_member(family_id));

-- ── Grants (RLS still filters rows; these just permit the operation) ─────────
-- families / family_members are only *written* through the SECURITY DEFINER
-- RPCs above, so clients need read-only access to them directly.
grant usage on schema public to anon, authenticated;
grant select on public.families, public.family_members to anon, authenticated;
grant select, insert, update, delete on public.profiles, public.progress to anon, authenticated;
grant execute on function public.create_family(), public.join_family(text), public.is_family_member(uuid) to anon, authenticated;
