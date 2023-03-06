const withNx = require('@nrwl/next/plugins/with-nx')

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 * */

const isDevelopment = process.env.NODE_ENV !== 'production'

// *自定義next-i18next.config.js路徑
process.env.I18NEXT_DEFAULT_CONFIG_PATH = `${__dirname}/next-i18next.config.js`
// eslint-disable-next-line import/no-dynamic-require
const { i18n } = require(`${__dirname}/next-i18next.config.js`)

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
							destination: `${process.env.DEVELOPMENT_ENV_DB_HOST}/api/:path*`,
						},
				  ]
				: [],
		}
	},
	i18n,
}

module.exports = withNx(nextConfig)
