import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true, //영구적 리다이렉트
      },
    ];
  },
  images: {
    domains: ["res.cloudinary.com", "utfs.io"],
  },
};

export default nextConfig;
