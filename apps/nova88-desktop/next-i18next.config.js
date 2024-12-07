/* eslint-disable */
const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
	i18n: {
		defaultLocale: 'default',
		locales: [
			'default',
			'en',
			'cs',
			'th',
			'my',
			'bd',
			'id',
			'kh',
			'hi',
			'vn',
			'ko',
			'br',
		],
		defaultNS: process.env.NEXT_PUBLIC_SITE_NAME,
		fallbackNS: 'common',
		fallbackLng: 'th',
	},
	reloadOnPrerender: isDevelopment,
}
