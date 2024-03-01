/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["rafi-demo-bucket.s3.amazonaws.com", "www.eclosio.ong"]
  },
  reactStrictMode: false
};

export default nextConfig;
