import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
    additionalData: `@import "variables.scss";`,
  },
};

export default nextConfig;
