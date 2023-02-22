## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## npm install

- npm install
- npm install prepare

## Configure your local environment

```
cp .env.development.example .env.development
```

將 `.env.development` 丟到 `app` 並給予相關設定

---

## next-i18next

### Setup

1. 安裝

```bash
next-i18next react-i18next i18next
```

2. Translation content

```bash
.
└── public
    └── locales
        ├── en
        |   └── common.json
        └── cs
            └── common.json
```

3. next-i18next.config.js

```js
// 在 app 檔案自定義 next-i18next.config.js
// path:apps/app/next-i18next.config.js
const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'cs', 'th'],
	},
	// * hot reload translate json content
	reloadOnPrerender: isDevelopment,
}
```

4. next.config.js

```js
// * 使用自定義的 next-i18next.config.js
process.env.I18NEXT_DEFAULT_CONFIG_PATH = `${__dirname}/next-i18next.config.js`
const { i18n } = require('./next-i18next.config')

const nextConfig = {
	// ...
	i18n,
}
```

5. `appWithTranslation` `HOC` 主要負責添加 `I18nextProvider` 功能

```tsx
import { appWithTranslation } from 'next-i18next'

const CustomApp = ({ Component, pageProps }) => <Component {...pageProps} />

export default appWithTranslation(CustomApp)
```

### example

#### SSR、SSG

```tsx
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale }) {
	return {
		props: {
			...(await serverSideTranslations(locale, ['common'])),
			// Will be passed to the page component as props
		},
	}
}
```

#### 使用翻譯

```tsx
import { useTranslation } from 'next-i18next'

export const Footer = () => {
	const { t } = useTranslation('common')

	return (
		<footer>
			<p>{t('description')}</p>
		</footer>
	)
}
```

#### [Reference](https://github.com/i18next/next-i18next/blob/master/README.md)
