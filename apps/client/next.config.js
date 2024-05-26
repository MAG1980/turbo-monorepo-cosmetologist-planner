/** @type {import('next').NextConfig} */

const apiUrl = `${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}`;

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
