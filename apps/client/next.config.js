/** @type {import('next').NextConfig} */

const apiUrl = `${process.env.APP_PROTOCOL}://${process.env.APP_HOST}:${process.env.APP_PORT}`;

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api",
        destination: apiUrl,
      },
      {
        source: "/api/:path",
        destination: `${apiUrl}/:path`,
      },
    ];
  },
};

module.exports = nextConfig;
