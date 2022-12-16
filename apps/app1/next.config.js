const withNx = require('@nrwl/next/plugins/with-nx')
const config = require('../../libs/configs/next.config')
/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 * */

const nextConfig = {
	nx: {
		// Set this to true if you would like to to use SVGR
		// See: https://github.com/gregberge/svgr
		svgr: false,
	},
	...config,
}

module.exports = withNx(nextConfig)
