const withNx = require('@nrwl/next/plugins/with-nx')
const config = require('../../libs/configs/next.config')
/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 * */

// *自定義next-i18next.config.js路徑
process.env.I18NEXT_DEFAULT_CONFIG_PATH = `${__dirname}/next-i18next.config.js`
const { i18n } = require('./next-i18next.config')

const nextConfig = {
	nx: {
		// Set this to true if you would like to to use SVGR
		// See: https://github.com/gregberge/svgr
		svgr: false,
	},
	...config,
	i18n,
}

module.exports = withNx(nextConfig)
