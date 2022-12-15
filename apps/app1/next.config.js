const withNx = require('@nrwl/next/plugins/with-nx')
const config = require('../../libs/configs/next.config')
/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 * */

const nextConfig = {
	...config,
}

module.exports = withNx(nextConfig)
