import type { MetadataRoute } from "next";
import { profile } from "@/data/resume";

// Cloudflare's managed robots.txt (AI crawler rules) is prepended to this in production.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${profile.url}/sitemap.xml`,
  };
}
