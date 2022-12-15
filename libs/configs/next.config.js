const isDevelopment = process.env.NODE_ENV !== 'production'

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
							destination: 'http://www.n88dev.com/api/:path*',
						},
				  ]
				: [],
		}
	},
}

module.exports = nextConfig
