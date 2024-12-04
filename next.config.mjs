/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      // edit: updated to new key. Was previously `allowedForwardedHosts`
      allowedOrigins: ['10.28.26.235'],
    },
  },
};

export default nextConfig;
