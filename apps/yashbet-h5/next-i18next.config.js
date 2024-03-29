/* eslint-disable */
const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
	i18n: {
		defaultLocale: 'default',
		locales: ['default', 'en', 'hi', 'bd'],
		defaultNS: process.env.NEXT_PUBLIC_SITE_NAME,
		fallbackNS: 'common',
		fallbackLng: 'en',
	},
	reloadOnPrerender: isDevelopment,
}
