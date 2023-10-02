/* eslint-disable */

const withNx = require('@nrwl/next/plugins/with-nx')

process.env.I18NEXT_DEFAULT_CONFIG_PATH = `${__dirname}/next-i18next.config.js`

const { i18n } = require('./next-i18next.config')

const nextConfig = {
	nx: {
		// Set this to true if you would like to to use SVGR
		// See: https://github.com/gregberge/svgr
		svgr: false,
	},
	images: {
		domains: [
			process.env.NEXT_PUBLIC_BANNER_DOMAIN,
			process.env.NEXT_PUBLIC_IMAGE_DOMAIN,
			process.env.NEXT_PUBLIC_PAYMENT_DOMAIN,
		],
		// 因為存在太多外部連結，先全打開
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
	async rewrites() {
		return {
			fallback: [
				{
					source: '/api/:path*',
					destination: `${process.env.NEXT_PUBLIC_ENV_DB_HOST}/api/:path*`,
				},
			],
		}
	},
	i18n: {
		...i18n,
		localeDetection: false, // * 不根據用戶語言環境自動導轉
		// * https://nextjs.org/docs/advanced-features/i18n-routing#disabling-automatic-locale-detection
	},
}

module.exports = withNx(nextConfig)
