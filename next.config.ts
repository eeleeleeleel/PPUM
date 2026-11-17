import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets phones on the same Wi-Fi load the dev server by the Mac's LAN IP.
  allowedDevOrigins: ["172.30.*.*", "192.168.*.*"],
};

export default nextConfig;
