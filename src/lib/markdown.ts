import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const contentDirectory = path.join(process.cwd(), "content");

// Ensure the directory exists
function ensureDirectory(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export interface MarkdownData<T> {
  slug: string;
  frontmatter: T;
  contentHtml: string;
}

export function getMarkdownFilesData<T>(subdir: string): MarkdownData<T>[] {
  const dirPath = path.join(contentDirectory, subdir);
  ensureDirectory(dirPath);

  const fileNames = fs.readdirSync(dirPath);
  const allData = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(dirPath, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data, content } = matter(fileContents);
      const contentHtml = marked.parse(content) as string;

      return {
        slug,
        frontmatter: data as T,
        contentHtml,
      };
    });

  return allData;
}

export function getMarkdownFileDataBySlug<T>(subdir: string, slug: string): MarkdownData<T> | null {
  const dirPath = path.join(contentDirectory, subdir);
  const fullPath = path.join(dirPath, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const contentHtml = marked.parse(content) as string;

  return {
    slug,
    frontmatter: data as T,
    contentHtml,
  };
}
