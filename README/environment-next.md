## Set your environment

預設情況下 NextJS 的 環境變數僅在 node server 可用 ( server side )，可用任意命名：

```shell
#.env
DB_HOST=localhost
DB_USER=myuser
DB_PASS=mypassword
```

usage :

```js
// pages/index.js
export async function getStaticProps() {
	const db = await myDB.connect({
		host: process.env.DB_HOST,
		username: process.env.DB_USER,
		password: process.env.DB_PASS,
	})
	// ...
}
```

若想建立瀏覽器亦可讀取的環境變數，必須加上前綴 `NEXT_PUBLIC_` :

```shell
NEXT_PUBLIC_SITE_NAME=nova88-desktop
```

## env types

1. `.env` : 本機環境，不會被儲存到 git 庫中，新建專案時需檢查該 project 有沒有此檔案存在，否則無法運行
2. `.env.example` : 本機環境參照範例，如無特定需求，新專案直接複製此檔案並改名成 `.env` 即可運行
3. `.env.dev` : dev 對應我們的測試環境會使用的變數 ( 正常情況不做修改 )
4. `.env.rls` : rls 對應我們的 release 環境使用的變數 ( 正常情況不做修改 )
5. `.env.prd` : prd 對應我們 production ( 正式 ) 環境使用的變數 ( 正常情況不做修改 )
