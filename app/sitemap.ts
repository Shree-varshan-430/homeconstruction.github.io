import { MetadataRoute } from "next";
import { getSortedPostsData } from "@/lib/posts";
import { siteConfig } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getSortedPostsData();
  const baseUrl = siteConfig.siteUrl;

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated || post.date),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const categories = [
    "bedroom-design",
    "living-room",
    "modular-kitchen",
    "wardrobes",
    "waterproofing",
    "floor-plans",
    "construction-cost",
    "vastu-planning",
    "bathroom-design",
    "renovation"
  ];

  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const mainUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }
  ];

  return [...mainUrls, ...categoryUrls, ...postUrls];
}
