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

1. `env` : 所有環境
2. `.env.development` : 僅開發環境可讀取到
3. `.env.production` : 僅 PRD 環境可讀取
4. `.env.local` : 權重最高，會覆蓋所有 env
