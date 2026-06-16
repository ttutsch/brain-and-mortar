#!/usr/bin/env bash
# Fetch CC-licensed Ottawa photos from Wikimedia Commons for the Act I trip.
# Picks the first search result with an acceptable license (PD/CC0/CC BY/CC BY-SA),
# downloads a 1600px thumb, and records attribution in CREDITS.md.
set -uo pipefail

OUT="$(cd "$(dirname "$0")/.." && pwd)/public/images/trips/ottawa"
mkdir -p "$OUT"
UA="TFamilyGame/0.1 (educational kids game; image sourcing script)"
API="https://commons.wikimedia.org/w/api.php"

SLUGS=(skyline parliament rideau byward museum drive-home)
QUERIES=(
  "Ottawa skyline Parliament Hill Ottawa River"
  "Centre Block Parliament Hill Ottawa"
  "Rideau Canal Ottawa locks summer"
  "ByWard Market Ottawa"
  "Canadian Museum of History Grand Hall totem"
  "Highway 401 Ontario"
)

: > "$OUT/credits.tmp"

for i in "${!SLUGS[@]}"; do
  slug="${SLUGS[$i]}"
  query="${QUERIES[$i]}"
  resp=$(curl -sG --max-time 30 -A "$UA" "$API" \
    --data-urlencode "action=query" \
    --data-urlencode "format=json" \
    --data-urlencode "generator=search" \
    --data-urlencode "gsrsearch=$query" \
    --data-urlencode "gsrnamespace=6" \
    --data-urlencode "gsrlimit=8" \
    --data-urlencode "prop=imageinfo" \
    --data-urlencode "iiprop=url|extmetadata|size" \
    --data-urlencode "iiurlwidth=1600")
  if [ -z "$resp" ]; then
    echo "FAIL  $slug: empty API response" >&2
    continue
  fi

  # Pick first page (by search index) that is a big-enough JPG/PNG with an accepted license.
  pick=$(echo "$resp" | jq -c '
    [.query.pages[]?] | sort_by(.index) | map(select(
      (.imageinfo[0].width // 0) >= 1200
      and ((.title | ascii_downcase) | test("\\.(jpe?g|png)$"))
      and ((.imageinfo[0].extmetadata.LicenseShortName.value // "") | ascii_downcase
           | test("^(cc by|cc-by|cc0|public domain|pd)"))
    )) | .[0] // empty | {
      title: .title,
      thumb: (.imageinfo[0].thumburl // .imageinfo[0].url),
      license: (.imageinfo[0].extmetadata.LicenseShortName.value // "?"),
      artist: ((.imageinfo[0].extmetadata.Artist.value // "Unknown") | gsub("<[^>]*>"; "") | .[0:120]),
      page: (.imageinfo[0].descriptionurl // "")
    }')
  if [ -z "$pick" ]; then
    echo "SKIP  $slug: no acceptable image for '$query'" >&2
    continue
  fi

  title=$(echo "$pick" | jq -r '.title')
  thumb=$(echo "$pick" | jq -r '.thumb')
  license=$(echo "$pick" | jq -r '.license')
  artist=$(echo "$pick" | jq -r '.artist' | tr -d '\n')
  page=$(echo "$pick" | jq -r '.page')

  if curl -s --max-time 90 -A "$UA" -o "$OUT/$slug.jpg" "$thumb"; then
    kb=$(( $(stat -f%z "$OUT/$slug.jpg") / 1024 ))
    echo "- **$slug.jpg** — \"${title#File:}\" by $artist, $license, via [Wikimedia Commons]($page) (${kb} KB)" >> "$OUT/credits.tmp"
    echo "OK    $slug: $title [$license] ${kb} KB"
  else
    echo "FAIL  $slug: download error" >&2
  fi
done

{
  echo "# Image credits — Ottawa trip"
  echo
  echo "All photos sourced from Wikimedia Commons under the licenses noted."
  echo "CC BY / CC BY-SA require this attribution to ship with the game."
  echo
  cat "$OUT/credits.tmp"
} > "$OUT/CREDITS.md"
rm -f "$OUT/credits.tmp"
echo
echo "Credits written to $OUT/CREDITS.md"
