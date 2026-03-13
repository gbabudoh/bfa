import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(
  './src/i18n/request.ts'
);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '149.102.155.247',
        port: '9000',
        pathname: '/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
