/** @type {import('next').NextConfig} */

const apiUrl = `${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API_HOST}:${process.env.NEXT_PUBLIC_API_PORT}/api`;
console.log({ apiUrl });
console.log(process.env.NEXT_PUBLIC_NESTJS_SERVER);
const nextConfig = {
  async rewrites() {
    return [
      //Перезапись url запросов к корню API для сопоставления с главной страницей сайта
      {
        source: "/api",
        destination: "/",
      },
      //Перезапись url запросов к frontend для сопоставления с backend-url
      {
        source: "/api/:path",
        destination: `${apiUrl}/:path`,
      },
    ];
  },
};

module.exports = nextConfig;
