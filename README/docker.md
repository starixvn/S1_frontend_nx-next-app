### 如何在 local build docker Images

1. 安裝 [docker](https://www.docker.com/)

2. 在專案目錄下執行以下指令
```bash
  docker build --build-arg project_name=${品牌名} --build-arg port=${專案port號} --build-arg env=${環境} -t ${Image名稱}:${版號} .
```
- 變數說明:
    1. ${品牌名}：專案名稱，例如：`nova88-desktop`
    2. ${專案port號}：要運行的 port 號，例如：`3000`，在 local 端執行隨便給不重複的 port 即可 
    3. ${環境}：在 local 執行環境給 dev，dockerFile 會在 build 時去抓對應的 env.${環境} 來執行該 image 
    4. ${Image名稱}:${版號}：在 local 端開發自己給名稱即可，例如：`nova88-desktop:1.0.0`

3.確認是否有成功建立 Image
```bash
  docker images
```
4. 執行 Image
```bash
  docker run -d -p ${對外port號}:${專案port號} ${Image名稱}:${版號}
```

- 對外 port 號通常會與專案 port 號相同，這樣 run 起來之後便可以透過 localhost:${對外port號} 來進入 image
- 除了用指令，也可以到 docker UI 介面用程式起 Image

5. env 說明：因 ssr 與 proxy 在此專案中由前端處理，所以各個環境會有不同的 api proxy 等設定，請參考 env.dev 等檔案，未來在建置新環境時再根據環境開出對應的 env 檔案


