## 起專案流程

### Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

### npm install

```
- npm install
- npm install prepare
```

### Configure your local environment

```
cp .env.example .env
```

將 `.env.development` 丟到 `apps/{appName}` folder 並給予相關設定

### Configure i18next

創建 next-i18next-config.js，給予支援語系與默認語系

apps/{appName}/next-i18next.config.js

```js
const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
	i18n: {
		defaultLocale: 'default',
		locales: ['default', 'en', 'cs', 'th', 'en-th'],
		defaultNS: process.env.NEXT_PUBLIC_SITE_NAME,
		fallbackNS: 'common',
	},
	reloadOnPrerender: isDevelopment,
}
```

<<<<<<< Updated upstream
### Configure tsconfig.base.json
到專案的 tsconfig.base.json 加入該專案的指定路徑，方便 import 時使用，避免使用 `../..`

底下以 app1 為例：
```json 
	"paths": {
			"@nx-next-app/api": ["libs/app/service/index.ts"],
			"@nx-next-app/store": ["libs/app/store"],
			"@nx-next-app/components": ["libs/web/src/components/index.ts"],
			"@nx-next-app/hooks": ["libs/web/src/hooks/index.ts"],
			"@nx-next-app/constants": ["libs/app/constants/index.ts"],
      "@app1/*" : ["apps/app1/*"]
		},
=======
\_app.tsx

```tsx
import { appWithTranslation } from 'next-i18next'

function CustomApp({ Component, pageProps }: AppProps) {
	// ...
	initLocaleEffect(router, 'en')

	return <>// ..</>
}

export default appWithTranslation(CustomApp)
```

### configure Redux

\_app.tsx

```tsx
function CustomApp({ Component, pageProps }: AppProps) {
	// ...

	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	)
}
>>>>>>> Stashed changes
```
