// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-extraneous-dependencies

process.env.I18NEXT_DEFAULT_CONFIG_PATH = `${__dirname}/next-i18next.config.js`

const { composePlugins, withNx } = require('@nx/next')
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
				// * Cashier api 的 domain 需關閉 i18n 自動添加前綴的設置，並自行給予 langId '/api' 的字段使其正確匹配
				// * 原因為 langId 組在 api controller 前面 ex: /en/Cashier/DepositReqCryptoPay
				{
					source: '/:langId/Cashier/:path*',
					destination: `${process.env.NEXT_PUBLIC_ENV_DB_HOST}/:langId/Cashier/:path*`,
					locale: false,
				},
				{
					source: '/health',
					destination: '/api/health',
				},
			],
		}
	},
	i18n: {
		...i18n,
		localeDetection: false, // * 不根據用戶語言環境自動導轉
		// * https://nextjs.org/docs/advanced-features/i18n-routing#disabling-automatic-locale-detection
	},
	output: 'standalone',
}

const plugins = [withNx]

module.exports = composePlugins(...plugins)(nextConfig)
