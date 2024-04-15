/* eslint-disable */
const path = require('path')
const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
	i18n: {
		defaultLocale: 'default',
		locales: ['default', 'en', 'hi', 'bd'],
		defaultNS: process.env.NEXT_PUBLIC_SITE_NAME,
		fallbackNS: 'common',
		fallbackLng: 'en',
		localePath: isDevelopment
			? path.resolve('../../public/locales')
			: './public/locales',
	},
	reloadOnPrerender: isDevelopment,
}
