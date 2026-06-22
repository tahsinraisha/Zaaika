import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://www.zaaika.co.uk", lastModified: new Date(), changeFrequency: "weekly", priority: 1 }];
}
