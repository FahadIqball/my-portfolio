import { getMarkdownFilesData } from "@/lib/markdown";
import BlogListing, { BlogPost } from "@/components/ui/BlogListing";
import PageTransition from "@/components/ui/PageTransition";
import styles from "./blog.module.css";

interface BlogFrontmatter {
  title: string;
  date: string;
  type: "article" | "note";
  excerpt: string;
  tags: string[];
}

export const metadata = {
  title: "Blog & Notes · Fahad Iqbal",
  description: "Read technical articles and TIL notes written by Fahad Iqbal about React Native, iOS/Android systems, and APIs.",
};

export default function BlogPage() {
  const fileData = getMarkdownFilesData<BlogFrontmatter>("blog");

  // Format and sort posts by date (newest first)
  const posts: BlogPost[] = fileData
    .map((item) => ({
      slug: item.slug,
      title: item.frontmatter.title,
      date: item.frontmatter.date,
      type: item.frontmatter.type,
      excerpt: item.frontmatter.excerpt,
      tags: item.frontmatter.tags || [],
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <PageTransition>
      <div className={`${styles.blogPage} container`}>
        <header className={styles.header}>
          <span className="mono-label">WRITING & NOTES</span>
          <h1 className={styles.title}>THE DEV JOURNAL</h1>
          <p className={styles.subtitle}>
            Thoughts, tutorials, and micro-learnings compiled while shipping mobile apps.
          </p>
        </header>

        <BlogListing initialPosts={posts} />
      </div>
    </PageTransition>
  );
}
