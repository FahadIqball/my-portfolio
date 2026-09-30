import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import PageTransition from "@/components/ui/PageTransition";
import CodeBlockManager from "@/components/ui/CodeBlockManager";
import { getMarkdownFileDataBySlug, getMarkdownFilesData } from "@/lib/markdown";
import styles from "./post.module.css";

interface BlogFrontmatter {
  title: string;
  date: string;
  type: "article" | "note";
  excerpt: string;
  tags: string[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getMarkdownFileDataBySlug<BlogFrontmatter>("blog", slug);

  if (!post) {
    notFound();
  }

  const { frontmatter, contentHtml } = post;

  // Retrieve all blog posts to calculate Prev/Next links
  const allPosts = getMarkdownFilesData<BlogFrontmatter>("blog")
    .map((item) => ({
      slug: item.slug,
      title: item.frontmatter.title,
      date: item.frontmatter.date,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <PageTransition>
      <CodeBlockManager />
      <article className={`${styles.postPage} container`}>
        <Link href="/blog" className={styles.backLink}>
          <ArrowLeft size={16} strokeWidth={1.5} />
          Back to journal
        </Link>

      <header className={styles.header}>
        <div className={styles.metaRow}>
          <span className={styles.badge}>{frontmatter.type}</span>
          <span className={styles.date}>
            <Calendar size={14} className={styles.metaIcon} />
            {formatDate(frontmatter.date)}
          </span>
        </div>

        <h1 className={styles.title}>{frontmatter.title}</h1>
        
        <div className={styles.tags}>
          {frontmatter.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              <Tag size={12} />
              {tag}
            </span>
          ))}
        </div>
      </header>

      <hr className={styles.divider} />

      <section className={styles.content}>
        <div
          dangerouslySetInnerHTML={{ __html: contentHtml }}
          className={styles.markdownBody}
        />
      </section>

      {/* Prev/Next Navigation */}
      {(prevPost || nextPost) && (
        <div className={styles.navigation}>
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`} className={styles.navCard}>
              <span className={styles.navLabel}>
                <ChevronLeft size={14} />
                Previous Post
              </span>
              <span className={styles.navTitle}>{prevPost.title}</span>
            </Link>
          ) : (
            <div className={styles.emptyCard} />
          )}

          {nextPost ? (
            <Link href={`/blog/${nextPost.slug}`} className={`${styles.navCard} ${styles.navCardRight}`}>
              <span className={styles.navLabel}>
                Next Post
                <ChevronRight size={14} />
              </span>
              <span className={styles.navTitle}>{nextPost.title}</span>
            </Link>
          ) : (
            <div className={styles.emptyCard} />
          )}
        </div>
      )}
    </article>
  </PageTransition>
);
}
