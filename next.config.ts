import withPWA from "next-pwa";
import runtimeCaching from "next-pwa/cache";

const nextConfig = withPWA({
  dest: "public",
  runtimeCaching,
  disable: process.env.NODE_ENV === "development",
  reactStrictMode: true,
});

export default nextConfig;
