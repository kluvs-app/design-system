#!/usr/bin/env bash
# Render every store asset to store/export/ using headless Chrome.
# Usage: store/render.sh            (all)
#        store/render.sh feature    (feature graphic only)
#        store/render.sh play       (one screenshot size: play | ios-69 | ios-65)
set -euo pipefail

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
DIR="$(cd "$(dirname "$0")" && pwd)"
OUT="$DIR/export"
ONLY="${1:-all}"

shots=$(grep -oE 'id: "[0-9]+"' "$DIR/shots.js" | grep -oE '[0-9]+')
SURFACE="${SURFACE:-}"   # optional override: SURFACE=dark store/render.sh
q() { [[ -n "$SURFACE" ]] && echo "&surface=$SURFACE"; }

declare -a SIZES=("play:1080:1920" "ios-69:1320:2868" "ios-65:1284:2778")

shoot() { # url w h out
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files \
    --force-device-scale-factor=1 --virtual-time-budget=4000 \
    --window-size="$2,$3" --screenshot="$4" "$1" >/dev/null 2>&1
  echo "  $(basename "$(dirname "$4")")/$(basename "$4")"
}

mkdir -p "$OUT"

if [[ "$ONLY" == all || "$ONLY" == feature ]]; then
  mkdir -p "$OUT/play"
  shoot "file://$DIR/feature-graphic.html?x=1$(q)" 1024 500 "$OUT/play/feature-graphic.png"
fi

for entry in "${SIZES[@]}"; do
  IFS=: read -r key w h <<<"$entry"
  [[ "$ONLY" == all || "$ONLY" == "$key" ]] || continue
  mkdir -p "$OUT/$key"
  for id in $shots; do
    shoot "file://$DIR/screenshot.html?shot=$id&size=$key$(q)" "$w" "$h" "$OUT/$key/screen-$id.png"
  done
done
