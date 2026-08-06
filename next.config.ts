import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [
      { source: "/butik", destination: "/utforska/produkter", permanent: true },
      { source: "/butik/:slug*", destination: "/utforska/produkter", permanent: true },
      { source: "/varukorg", destination: "/utforska", permanent: true },
      { source: "/checkout/:path*", destination: "/utforska", permanent: true },
      { source: "/frakt", destination: "/utforska/produkter", permanent: true },
      { source: "/retur", destination: "/utforska/produkter", permanent: true },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

export default withMDX(nextConfig);
