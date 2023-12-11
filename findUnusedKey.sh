
# 目前分頁
SITE_LIST=(nova88 yashbet)

# READ SITE
echo "選擇品牌 (單選)"
for i in ${SITE_LIST[@]}
do
  echo "$i \c"
done
echo ",ex: common nova88 // 更新兩個品牌，中間用空白鍵分隔、大小寫不拘"
read -p ": " site

node sheet/findUnusedKey.js $site

echo "find unusedKey done."


