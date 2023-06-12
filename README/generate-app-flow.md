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

將 `.env` 丟到 `apps/{appName}` folder 並給予相關設定

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
		domains: [process.env.NEXT_PUBLIC_BANNER_DOMAIN],
	},
	async rewrites() {
		return {
			fallback: [
				{
					source: '/api/:path*',
					destination: `${process.env.NEXT_PUBLIC_ENV_DB_HOST}/api/:path*`,
				},
			],
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

- 加入 store 完成 react-redux 配置
- 加入 ConfigProvider 讓元件之間可以跨組間溝通
- 加入 appWithTranslation HOC 完成語系設定
- 配置 style
- 配置 dayjs 相關設定

```tsx
import { AppProps } from 'next/app'
import { store } from '@nx-next-app/store'
import { Provider } from 'react-redux'
import { ConfigProvider } from '@nx-next-app/components/D0001'
import { appWithTranslation } from 'next-i18next'

// * supply localized format options
// * https://day.js.org/docs/en/plugin/localized-format
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

import '../styles/css/style.css'
import '../styles/css/swiper.css'
import '../styles/css/font.css'
import '../styles/css/datePicker.css'

dayjs.extend(localizedFormat)

function CustomApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Provider store={store}>
				{/* 提供 Component 狀態管理 */}
				<ConfigProvider>
					<Component {...pageProps} />
				</ConfigProvider>
			</Provider>
		</>
	)
}

export default appWithTranslation(CustomApp)
```

在 public/locales/{locale} 加入 json 語系檔案

```
public/
  └── locales/
      └── en/
          ├── {process.env["NEXT_PUBLIC_SITE_NAME"]}.json
          └── common.json
```

給予 port 號，規則：
_-desktop: 400x
_.h5: 300x

// project.json

```json
		"serve": {
			"executor": "@nrwl/next:server",
			"defaultConfiguration": "development",
			"options": {
				"buildTarget": "nova88-desktop:build",
				"dev": true,
				"port": 4001 //給予port號
			},
```
