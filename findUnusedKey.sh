#!/bin/sh
# Available brands
SITE_LIST=(common nsDemo nova88)

# READ SITE
echo "Select a brand (single choice):"
for i in ${SITE_LIST[@]}
do
  echo "$i \c"
done
echo ", e.g., common nova88 // Update two brands, separated by spaces, case insensitive"
read -p ": " site

node sheet/findUnusedKey.js $site

echo "Finding unused keys completed."
