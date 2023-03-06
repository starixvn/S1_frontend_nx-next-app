const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
	i18n: {
		defaultLocale: 'en',
		locales: ['en', 'cs', 'th', 'en-th'],
	},
	fallbackLng: {
		default: ['en'],
	},
	reloadOnPrerender: isDevelopment,
}
