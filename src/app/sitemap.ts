import type { MetadataRoute } from "next";
import { profile } from "@/data/resume";

// Single-page site. No lastModified: there's no reliable content date to report.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: profile.url }];
}
