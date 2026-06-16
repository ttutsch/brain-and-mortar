// Web Crypto helpers. The password hashing here is reasonable for local-only
// storage (PBKDF2-SHA256, 100k iterations). When we add cloud sync we'll
// hash server-side with argon2/bcrypt — see DESIGN.md §16.

const PBKDF2_ITERATIONS = 100_000;
const HASH_BITS = 256;

function bytesToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function generateSalt(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return bytesToHex(bytes.buffer);
}

export async function hashPassword(password: string, saltHex: string): Promise<string> {
  const encoder = new TextEncoder();
  const passwordKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  const saltBytes = new Uint8Array(saltHex.length / 2);
  for (let i = 0; i < saltBytes.length; i++) {
    saltBytes[i] = parseInt(saltHex.slice(i * 2, i * 2 + 2), 16);
  }
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: saltBytes,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    passwordKey,
    HASH_BITS
  );
  return bytesToHex(bits);
}

export async function verifyPassword(
  password: string,
  saltHex: string,
  expectedHashHex: string
): Promise<boolean> {
  const candidate = await hashPassword(password, saltHex);
  // Constant-time comparison is overkill for local-only but cheap and good hygiene.
  if (candidate.length !== expectedHashHex.length) return false;
  let diff = 0;
  for (let i = 0; i < candidate.length; i++) {
    diff |= candidate.charCodeAt(i) ^ expectedHashHex.charCodeAt(i);
  }
  return diff === 0;
}

export function generateId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID()}`;
}
