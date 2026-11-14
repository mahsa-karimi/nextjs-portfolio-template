import type { MetadataRoute } from "next";
import { API_ENDPOINTS } from "@/config/api-endpoints";
import { env } from "@/config/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: API_ENDPOINTS.apiRoot,
    },
    sitemap: new URL("/sitemap.xml", env.NEXT_PUBLIC_SITE_URL).toString(),
  };
}
