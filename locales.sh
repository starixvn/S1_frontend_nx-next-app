#!/bin/sh
# Existing brands
SITE_LIST=(common nsDemo nova88 onetwobet yashbet)

# READ
echo "Select brand(s) (single or multiple):"
for i in ${SITE_LIST[@]}
do
  echo "$i \c"
done

read -p ": " site
siteList=($(echo "$site" | tr ' ' '\n'))

node sheet/SheetToJson.js $site

echo ""

echo "Do you want to sort and update the spreadsheet?"
echo "(Optional. If you run, any interrupting may clear the sheet data.)"
read -p "(y/N): " isUpdating
if [[ "$isUpdating" == "y" || "$isUpdating" == "Y" ]]; then
  node sheet/SheetSort.js $site
fi
