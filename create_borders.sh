#!/bin/sh

borders="2764 1f338 2b50 1f536 1f3b6 1f43e"

mkdir -p ./public/assets/borders
rm -f ./public/assets/borders/*.png

for border in $borders
do
  montage \
  ./node_modules/emojione/assets/png/$border.png \
  ./node_modules/emojione/assets/png/$border.png \
  ./node_modules/emojione/assets/png/$border.png \
  ./node_modules/emojione/assets/png/$border.png \
  ./node_modules/emojione/assets/png/$border.png \
  ./node_modules/emojione/assets/png/$border.png \
  ./node_modules/emojione/assets/png/$border.png \
  ./node_modules/emojione/assets/png/$border.png \
  ./node_modules/emojione/assets/png/$border.png \
  -mode Concatenate -tile 3x3 \
  ./public/assets/borders/$border.png

  convert \
  ./public/assets/borders/$border.png \
  -monochrome -colors 2 \
  ./public/assets/borders/$border.png
done

if command -v imageoptim >/dev/null 2>&1; then
  imageoptim --directory ./public/assets/borders
else
  echo >&2 "Could not find imageoptim-cli. Skipping optimization"
fi
