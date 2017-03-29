#!/bin/sh
DEFAULT_PATH='./public/assets'
BORDER_PATH=${1:-$DEFAULT_PATH}

borders="2764 1f338 2b50 1f536 1f3b6 1f43e"

mkdir -p $BORDER_PATH/borders
rm -f $BORDER_PATH/borders/*.png

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
  $BORDER_PATH/borders/$border.png

  convert \
  $BORDER_PATH/borders/$border.png \
  -monochrome -colors 2 \
  $BORDER_PATH/borders/$border.png
done

if command -v imageoptim >/dev/null 2>&1; then
  imageoptim --directory $BORDER_PATH/borders
else
  echo >&2 "Could not find imageoptim-cli. Skipping optimization"
fi
