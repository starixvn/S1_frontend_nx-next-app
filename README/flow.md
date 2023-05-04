## 起專案流程

### Generate an application

Run `nx g @nrwl/next:app my-new-app` to generate an application.

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

### Configure i18next and next.config.js

創建 next-i18next.config.js，給予支援語系與默認語系

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

apps/{appName}/next.config.js

```js
const withNx = require('@nrwl/next/plugins/with-nx')

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 * */

const isDevelopment = process.env.NODE_ENV !== 'production'

// * 自定義next-i18next.config.js路徑
process.env.I18NEXT_DEFAULT_CONFIG_PATH = `${__dirname}/next-i18next.config.js`

const { i18n } = require('./next-i18next.config')

const nextConfig = {
	nx: {
		// Set this to true if you would like to to use SVGR
		// See: https://github.com/gregberge/svgr
		svgr: false,
	},
	images: {
		// domains: ['banner.0814media.net'],
		domains: [process.env.NEXT_PUBLIC_BANNER_DOMAIN],
	},
	async rewrites() {
		return {
			fallback: isDevelopment
				? [
						{
							source: '/api/:path*',
							destination: `${process.env.NEXT_PUBLIC_ENV_DB_HOST}/api/:path*`,
						},
				  ]
				: [],
		}
	},
	i18n: {
		...i18n,
		localeDetection: false, // * 不根據用戶語言環境自動導轉
		// * https://nextjs.org/docs/advanced-features/i18n-routing#disabling-automatic-locale-detection
	},
}

module.exports = withNx(nextConfig)
```

\_app.tsx

- 加入 initLocaleEffect 用於自定義初始語系
- 加入 appWithTranslation HOC 完成語系設定

```tsx
import { appWithTranslation } from 'next-i18next'
import { initLocaleEffect } from '@nx-next-app/hooks'
import { useRouter } from 'next/router'

function CustomApp({ Component, pageProps }: AppProps) {
	const router = useRouter()

	initLocaleEffect(router, 'en')

	return <>// ..</>
}

export default appWithTranslation(CustomApp)
```

在 public/locales/{locale} 加入 json 語系檔案

```
public/
  └── locales/
      └── en/
          ├── {appName}.json
          └── common.json
```

### Configure redux and styles

- 提供 `Provider` and `store`
- 提供 `ConfigProvider`ㄔ
- 創建 `styles` 將設計提供的 `css`、`font` 放在 apps/{appName}/styles 資料夾，並在 `_app` 引用

\_app.tsx

```tsx
import { Provider } from 'react-redux'
import { store } from '@nx-next-app/store'
import { ConfigProvider } from '@nx-next-app/components/{Modal}'

import '../styles/css/style.css'
import '../styles/css/swiper.css'
import '../styles/css/font.css'

function CustomApp({ Component, pageProps }: AppProps) {
	// ...

	return (
		    <Head>
				<title>Welcome to nova88!</title>
			</Head>

			{/* Redux 狀態管理 */}
			<Provider store={store}>
				{/* 提供 Component 狀態管理 */}
				<ConfigProvider>
					<Component {...pageProps} />
				</ConfigProvider>
			</Provider>
	)
}
```
