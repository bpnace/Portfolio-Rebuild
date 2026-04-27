import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

const siteUrl = new URL(siteConfig.url);

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteUrl.host,
  };
}
