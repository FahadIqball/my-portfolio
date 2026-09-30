import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import PageTransition from "@/components/ui/PageTransition";
import TechIcon from "@/components/ui/TechIcon";
import { getMarkdownFileDataBySlug } from "@/lib/markdown";
import styles from "./project.module.css";

interface ProjectFrontmatter {
  title: string;
  summary: string;
  tech: string[];
  github?: string;
  live?: string;
  role: string;
  period: string;
  layout?: "split" | "wide";
  images?: string[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getMarkdownFileDataBySlug<ProjectFrontmatter>("projects", slug);

  if (!project) {
    notFound();
  }

  const { frontmatter, contentHtml } = project;
  const hasImages = frontmatter.images && frontmatter.images.length > 0;
  const layout = frontmatter.layout || "split";

  return (
    <PageTransition>
      <article className={`${styles.projectPage} container`}>
        <Link href="/#projects" className={styles.backLink}>
          <ArrowLeft size={16} strokeWidth={1.5} />
          Back to projects
        </Link>

        <header className={styles.header}>
          <div className={styles.metaRow}>
            <span className="mono-label">{frontmatter.role}</span>
            <span className={styles.metaDot}>·</span>
            <span className={styles.period}>{frontmatter.period}</span>
          </div>
          
          <h1 className={styles.title}>{frontmatter.title}</h1>
          <p className={styles.summary}>{frontmatter.summary}</p>

          <div className={styles.tagsAndLinks}>
            <div className={styles.tags}>
              {frontmatter.tech.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>

            <div className={styles.links}>
              {frontmatter.github && (
                <a
                  href={frontmatter.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionBtn}
                >
                  <TechIcon slug="github" size={16} />
                  Code
                </a>
              )}
              {frontmatter.live && (
                <a
                  href={frontmatter.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionBtn}
                >
                  <ExternalLink size={16} strokeWidth={1.5} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </header>

        {hasImages && layout === "wide" && frontmatter.images?.[0] && (
          <div className={styles.wideHeroImageWrapper}>
            <img
              src={frontmatter.images[0]}
              alt={frontmatter.title}
              className={styles.wideHeroImage}
            />
          </div>
        )}

        <hr className={styles.divider} />

        {hasImages && layout === "split" ? (
          <div className={styles.splitLayoutGrid}>
            <section className={styles.splitContent}>
              <div
                dangerouslySetInnerHTML={{ __html: contentHtml }}
                className={styles.markdownBody}
              />
            </section>
            <aside className={styles.splitImagesStack}>
              {frontmatter.images?.map((src, index) => (
                <div key={index} className={styles.imageCard}>
                  <img
                    src={src}
                    alt={`${frontmatter.title} screenshot ${index + 1}`}
                    className={styles.screenshotImage}
                  />
                </div>
              ))}
            </aside>
          </div>
        ) : (
          <section className={`${styles.content} ${styles.centeredContent}`}>
            <div
              dangerouslySetInnerHTML={{ __html: contentHtml }}
              className={styles.markdownBody}
            />
          </section>
        )}
      </article>
    </PageTransition>
  );
}
