# Production 建置流程

執行 `app={$品牌} npm run build` 時，因有特定共用資源不會被 next 自動包入 production 資料夾內，所以必須另外執行 `script.sh` 來複製特定資料進成品資料夾。

需要拷貝的資料有：

1. .env file ，這樣 node server 才可以吃到變數 
2. next-i18next.config.js ，這隻檔案不會被 next 打包進去
3. public/locales/  共用庫中的 i18n 語系， ssr 時需要有語系檔供 server 解析
