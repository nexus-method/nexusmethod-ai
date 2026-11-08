#!/usr/bin/env bash
# Copy slop gate for nexusmethod.ai.
#
# The deployed site is a forwarding address: next.config.ts 301s every path to
# mollyjaggers.com, so a built-and-served page carries no copy to score. The copy
# that ships the moment that redirect comes down is authored in src/content.ts
# (the copy map) and src/app/privacy/page.tsx (inline JSX). This extracts the
# copy from those two files and scores each page's text with deslop.py.
# Any page below 5/5 fails the run. No build or Node is needed.
#
# Usage:  bash scripts/copy-gate/run.sh
set -uo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
OUT="$(mktemp -d)"
trap 'rm -rf "$OUT"' EXIT

echo "== extracting copy from source"
python3 "$HERE/extract.py" "$ROOT" "$OUT" || { echo "copy-gate: extraction failed"; exit 2; }

FAILED=0
SUMMARY=""
for file in "$OUT"/*.html; do
  page="$(basename "$file" .html)"
  echo
  echo "################ $page"
  if python3 "$HERE/deslop.py" "$file" --allow "$HERE/allow.txt"; then
    SUMMARY="$SUMMARY"$'\n'"  $page  5/5"
  else
    FAILED=1
    score="$(python3 "$HERE/deslop.py" "$file" --allow "$HERE/allow.txt" 2>/dev/null | grep -oE 'score [0-9]/5' | tail -1)"
    SUMMARY="$SUMMARY"$'\n'"  $page  ${score:-failed}"
  fi
done

echo
echo "== summary"
printf '%s\n' "$SUMMARY"
if [ "$FAILED" -ne 0 ]; then
  echo "copy-gate: at least one page is below 5/5"
  exit 1
fi
echo "copy-gate: every page is 5/5"
