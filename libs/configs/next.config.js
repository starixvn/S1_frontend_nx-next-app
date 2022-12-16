const isDevelopment = process.env.NODE_ENV !== 'production'

const nextConfig = {
	async rewrites() {
		return {
			fallback: isDevelopment
				? [
						{
							source: '/api/:path*',
							destination: process.env.DEVELOPMENT_ENV_DB_HOST + '/api/:path*',
						},
				  ]
				: [],
		}
	},
}

module.exports = nextConfig
