"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, FileText } from "lucide-react";
import styles from "./BlogListing.module.css";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  type: "article" | "note";
  excerpt: string;
  tags: string[];
}

interface BlogListingProps {
  initialPosts: BlogPost[];
}

export default function BlogListing({ initialPosts }: BlogListingProps) {
  const [filter, setFilter] = useState<"all" | "article" | "note">("all");

  const filteredPosts = initialPosts.filter((post) => {
    if (filter === "all") return true;
    return post.type === filter;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className={styles.listingContainer}>
      {/* Filter Tabs */}
      <div className={styles.filterBar}>
        <button
          onClick={() => setFilter("all")}
          className={`${styles.filterBtn} ${filter === "all" ? styles.activeFilter : ""}`}
        >
          All Updates
        </button>
        <button
          onClick={() => setFilter("article")}
          className={`${styles.filterBtn} ${filter === "article" ? styles.activeFilter : ""}`}
        >
          Articles
        </button>
        <button
          onClick={() => setFilter("note")}
          className={`${styles.filterBtn} ${filter === "note" ? styles.activeFilter : ""}`}
        >
          Notes & TILs
        </button>
      </div>

      {/* Posts List */}
      <div className={styles.postsGrid}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <article key={post.slug} className={styles.postCard}>
              <div className={styles.cardHeader}>
                <div className={styles.typeBadge}>
                  {post.type === "article" ? (
                    <BookOpen size={14} className={styles.badgeIcon} />
                  ) : (
                    <FileText size={14} className={styles.badgeIcon} />
                  )}
                  <span>{post.type}</span>
                </div>
                <span className={styles.postDate}>{formatDate(post.date)}</span>
              </div>

              <h2 className={styles.postTitle}>
                <Link href={`/blog/${post.slug}`} className={styles.titleLink}>
                  {post.title}
                </Link>
              </h2>
              
              <p className={styles.postExcerpt}>{post.excerpt}</p>

              <div className={styles.cardFooter}>
                <div className={styles.tags}>
                  {post.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      #{tag}
                    </span>
                  ))}
                </div>

                <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                  Read More
                  <ArrowRight size={14} className={styles.arrow} />
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className={styles.emptyState}>
            <p>No posts found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
