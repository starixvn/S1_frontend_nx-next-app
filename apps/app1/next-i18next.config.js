const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
	i18n: {
		defaultLocale: 'default',
		locales: ['default', 'en', 'cs', 'th', 'en-th'],
		// 預設 nameSpace , 為該品牌客製的翻譯文件
		defaultNS: process.env.NEXT_PUBLIC_SITE_NAME,
		// 假如特定品牌沒有該 label，則會使用 'common.json'
		fallbackNS: 'common',
	},
	reloadOnPrerender: isDevelopment,
}
