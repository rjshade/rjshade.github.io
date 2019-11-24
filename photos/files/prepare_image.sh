#!/bin/bash

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 path/to/original.jpg"
  exit 1
fi

INPUT=$1
OUTPUT_DIR="./"
OUTPUT_THUMBS="./thumbs"
OUTPUT_RETINA="./retina"
OUTPUT_RETINA_THUMBS="./retina/thumbs"

function resize_image() {
  INPUT=$1
  OUTPUT_PATH=$2
  OUTPUT_WIDTH=$3
  # Arguments from https://www.smashingmagazine.com/2015/06/efficient-image-resizing-with-imagemagick/
  mogrify -path $OUTPUT_PATH -filter Triangle -define filter:support=2 -thumbnail $OUTPUT_WIDTH -unsharp 0.25x0.08+8.3+0.045 -dither None -posterize 136 -quality 82 -define jpeg:fancy-upsampling=off -define png:compression-filter=5 -define png:compression-level=9 -define png:compression-strategy=1 -define png:exclude-chunk=all -interlace none -colorspace sRGB $INPUT
}

echo "creating resized image"
resize_image $INPUT $OUTPUT_DIR 500

echo "creating thumb"
resize_image $INPUT $OUTPUT_THUMBS 300

echo "creating retina"
resize_image $INPUT $OUTPUT_RETINA 1500

echo "creating retina thumb"
resize_image $INPUT $OUTPUT_RETINA_THUMBS 600
