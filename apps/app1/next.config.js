const withNx = require('@nrwl/next/plugins/with-nx')

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 * */

const isDevelopment = process.env.NODE_ENV !== 'production'

// * 自定義next-i18next.config.js路徑
process.env.I18NEXT_DEFAULT_CONFIG_PATH = `${__dirname}/next-i18next.config.js`

const { i18n } = require('./next-i18next.config')

const nextConfig = {
	nx: {
		// Set this to true if you would like to to use SVGR
		// See: https://github.com/gregberge/svgr
		svgr: false,
	},
	async rewrites() {
		return {
			fallback: isDevelopment
				? [
						{
							source: '/api/:path*',
							destination: `${process.env.NEXT_PUBLIC_ENV_DB_HOST}/api/:path*`,
						},
				  ]
				: [],
		}
	},
	i18n: {
		...i18n,
		localeDetection: false, // * 不根據用戶語言環境自動導轉
		// * https://nextjs.org/docs/advanced-features/i18n-routing#disabling-automatic-locale-detection
	},
}

module.exports = withNx(nextConfig)
