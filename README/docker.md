### 如何在 local build docker Images

1. 安裝 [docker](https://www.docker.com/)

2. 在專案目錄下執行以下指令
```bash
  docker build --build-arg project_name=${品牌名} --build-arg port=${專案port號} -t ${Image名稱}:${版號} .
```
3. 確認是否有成功建立 Image
```bash
  docker images
```
4. 執行 Image
```bash
  docker run -d -p ${對外port號}:${專案port號} ${Image名稱}:${版號}
```

- 對外 port 號通常會與專案 port 號相同，這樣 run 起來之後便可以透過 localhost:${對外port號} 來進入 image
- 除了用指令，也可以到 docker UI 介面用程式起 Image 

