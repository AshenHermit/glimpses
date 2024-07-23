/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ashen-hermit.42web.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
