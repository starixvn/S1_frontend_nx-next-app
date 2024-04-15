const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require('path')

module.exports = {
	i18n: {
		defaultLocale: 'default',
		locales: ['default', 'en', 'cs', 'th', 'my', 'bd', 'id', 'kh', 'hi', 'vn'],
		defaultNS: process.env.NEXT_PUBLIC_SITE_NAME,
		fallbackNS: 'common',
		fallbackLng: 'en',
		localePath: isDevelopment
			? path.resolve('../../public/locales')
			: './public/locales',
	},
	reloadOnPrerender: isDevelopment,
}
