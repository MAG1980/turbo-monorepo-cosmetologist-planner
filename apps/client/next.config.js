/** @type {import('next').NextConfig} */

const apiUrl = `${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}`;
console.log({ apiUrl });
console.log(process.env.NEXT_PUBLIC_NESTJS_SERVER);
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
