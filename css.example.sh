#!/bin/sh
# 從 UI設計同仁的 Design Project 更新 css 至指定品牌的專案

# 配置到當前路徑，組員在這邊需更改為自己專案的路徑
DESIGN_PROJECT=/Users/lukelin/Project/Design
PROJECT=/Users/lukelin/Project/NX-NEXT-APP
# 裝置
DEVICE_LIST=(DESKTOP H5)
# 目前既有品牌
SITE_LIST=(LEOBET NOVA88)

# READ SITE
echo "選擇品牌"
for i in ${SITE_LIST[@]}
do
  echo "$i \c"
done
echo ",ex: LEOBET NOVA88 // 更新兩個品牌，中間用空白鍵分隔、大小寫不拘"
read -p ": " site
siteList=($(echo "$site" | tr ' ' '\n'))

# READ DEVICE
echo "選擇裝置"
for i in ${DEVICE_LIST[@]}
do
  echo "$i \c"
done
echo ",ex: DESKTOP H5 // 中間用空白鍵分隔、大小寫不拘"
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
  done

done

# --

