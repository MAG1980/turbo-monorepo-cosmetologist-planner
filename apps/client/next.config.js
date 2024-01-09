/** @type {import('next').NextConfig} */

const apiUrl = `http://${ process.env.HOST }:${ process.env.API_PORT }`

const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/api',
				destination: apiUrl,
			},
			{
				source: '/api/:path',
				destination: `${ apiUrl }/:path`,
			}
		]
	}
}

module.exports = nextConfig
