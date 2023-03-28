const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
	i18n: {
		defaultLocale: 'default',
		locales: ['default', 'en', 'cs', 'th', 'en-th'],
		localeDetection: false,
	},
	fallbackLng: {
		default: ['en'],
	},
	reloadOnPrerender: isDevelopment,
}
