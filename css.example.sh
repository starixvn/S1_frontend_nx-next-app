#!/bin/sh
# 從 UI設計同仁的 Design Project 更新 css 至指定品牌的專案

# 配置到當前路徑，組員在這邊需更改為自己專案的路徑，絕對或相對皆可
DESIGN_PROJECT=../Design
PROJECT=.

# 裝置
DEVICE_LIST=(DESKTOP H5)
# 目前既有品牌
SITE_LIST=(NOVA88 ONETWOBET YASHBET)

# READ SITE
echo "選擇品牌 (中間用空白分隔、大小寫不拘。例: NOVA88 ONETWOBET YASHBET)"
for i in ${SITE_LIST[@]}
do
  echo "$i \c"
done
echo ""
read -p ": " site
siteList=($(echo "$site" | tr ' ' '\n'))

# READ DEVICE
echo "選擇裝置 (中間用空白分隔、大小寫不拘。例: DESKTOP H5)"
for i in ${DEVICE_LIST[@]}
do
  echo "$i \c"
done
echo ""
read -p ": " device
deviceList=($(echo "$device" | tr ' ' '\n'))

# Update
for device in ${deviceList[@]}
do
  for site in ${siteList[@]}
  do
    designPath="${DESIGN_PROJECT}/$site/$device/public/css"
    projectPath="${PROJECT}/apps/$site-$device/styles"

    echo $designPath "->" $projectPath
    cp -R ${designPath} ${projectPath}

    # 複製 CSS 內用到的相對路徑圖片
    designImgPath="${DESIGN_PROJECT}/$site/$device/public/img/style-img"
    projectImgPath="${PROJECT}/apps/$site-$device/styles/img"
    if [ -d "$designImgPath" ]; then
      echo $designImgPath "->" $projectImgPath
      cp -R ${designImgPath} ${projectImgPath}
    fi
  done

done

# --

