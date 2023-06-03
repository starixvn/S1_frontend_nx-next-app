const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
	i18n: {
		defaultLocale: 'default',
		locales: ['default', 'en', 'cs', 'th', 'my', 'bd', 'id', 'kh'],
		defaultNS: process.env.NEXT_PUBLIC_SITE_NAME,
		fallbackNS: 'common',
	},
	reloadOnPrerender: isDevelopment,
}
