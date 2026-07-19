/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'http', hostname: 'localhost', port: '1337' },
      { protocol: 'http', hostname: 'cms', port: '1337' },
      { protocol: 'https', hostname: 'admin.ateliemarinaneira.com.br' },
    ],
  },
};

module.exports = nextConfig;
