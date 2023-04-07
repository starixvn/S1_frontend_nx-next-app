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
    // 自定義 default 為 default 語系，搭配 locale hooks ，這樣不帶語系時可以保持我們自己設定的預設
    defaultLocale: 'default',
    locales: ['default', 'en', 'cs', 'th', 'en-th'],
    // 預設 nameSpace , 為該品牌客製的翻譯文件
    defaultNS: process.env.NEXT_PUBLIC_SITE_NAME,
    // 假如特定品牌沒有該 label，則會使用 'common.json'
    fallbackNS: 'common',
  },
  reloadOnPrerender: isDevelopment,
}
```

在 next-i18next 設定好 defaultNS 後，i18n 會依序去 `defaultNS` 找尋 label => 再去 `fallbackNS`

4. next.config.js

```js
// * 使用自定義的 next-i18next.config.js
process.env.I18NEXT_DEFAULT_CONFIG_PATH = `${__dirname}/next-i18next.config.js`
const { i18n } = require('./next-i18next.config')

const nextConfig = {
	// ...
  // 因為有給 default 語系，關閉 localeDetection
  i18n: { ...i18n, localeDetection: false },
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
			...(await serverSideTranslations(locale)),
			// Will be passed to the page component as props
		},
	}
}
```

#### 使用翻譯

```tsx
import { useTranslation } from 'next-i18next'

export const Footer = () => {
	const { t } = useTranslation()

	return (
		<footer>
			<p>{t('description')}</p>
		</footer>
	)
}
```

#### [Reference](https://github.com/i18next/next-i18next/blob/master/README.md)
