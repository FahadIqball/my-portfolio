import { MetadataRoute } from "next";
import { getMarkdownFilesData } from "@/lib/markdown";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://fahadiqbal.dev";

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // Dynamic projects routes
  const projectFiles = getMarkdownFilesData("projects");
  const projectRoutes = projectFiles.map((file) => ({
    url: `${baseUrl}/projects/${file.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic blog routes
  const blogFiles = getMarkdownFilesData("blog");
  const blogRoutes = blogFiles.map((file) => ({
    url: `${baseUrl}/blog/${file.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
