import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface PostData {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
  content: string;
  readingTime: string;
}

// Simple reading time estimator
export function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200; // Editorial reading speed
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

import { getCategoryDetails } from "./categories";
export { getCategoryDetails };

export function getSortedPostsData(categoryFilter?: string, tagFilter?: string, searchQuery?: string): PostData[] {
  // Gracefully handle if directory doesn't exist yet (first build bootstrap)
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  let allPostsData: PostData[] = fileNames
    .filter(fileName => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx$/, "").replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const matterResult = matter(fileContents);
      const content = matterResult.content;
      const readingTime = calculateReadingTime(content);

      return {
        slug,
        title: matterResult.data.title || "",
        description: matterResult.data.description || "",
        date: matterResult.data.date || "",
        updated: matterResult.data.updated || "",
        author: matterResult.data.author || "GK Home Construction Editorial",
        category: matterResult.data.category || "",
        tags: matterResult.data.tags || [],
        image: matterResult.data.image || "/images/placeholder.webp",
        featured: matterResult.data.featured ?? false,
        content,
        readingTime,
      };
    });

  // Sort posts by date (newest first)
  allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  // Apply filters if present
  if (categoryFilter) {
    const cleanCategoryFilter = categoryFilter.toLowerCase();
    allPostsData = allPostsData.filter(post => post.category.toLowerCase() === cleanCategoryFilter);
  }

  if (tagFilter) {
    const cleanTagFilter = tagFilter.toLowerCase();
    allPostsData = allPostsData.filter(post => post.tags.some(tag => tag.toLowerCase() === cleanTagFilter));
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    allPostsData = allPostsData.filter(
      post =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
    );
  }

  return allPostsData;
}

export function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map(fileName => {
      return {
        params: {
          slug: fileName.replace(/\.mdx$/, "").replace(/\.md$/, ""),
        },
      };
    });
}

export function getPostData(slug: string): PostData | null {
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`);
  const mdPath = path.join(postsDirectory, `${slug}.md`);
  let fullPath = "";

  if (fs.existsSync(mdxPath)) {
    fullPath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    fullPath = mdPath;
  } else {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const content = matterResult.content;
  const readingTime = calculateReadingTime(content);

  return {
    slug,
    title: matterResult.data.title || "",
    description: matterResult.data.description || "",
    date: matterResult.data.date || "",
    updated: matterResult.data.updated || "",
    author: matterResult.data.author || "GK Home Construction Editorial",
    category: matterResult.data.category || "",
    tags: matterResult.data.tags || [],
    image: matterResult.data.image || "/images/placeholder.webp",
    featured: matterResult.data.featured ?? false,
    content,
    readingTime,
  };
}

export function getAllCategories() {
  const posts = getSortedPostsData();
  const categoryCounts: { [key: string]: number } = {};

  posts.forEach(post => {
    if (post.category) {
      const cat = post.category.toLowerCase();
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    }
  });

  return Object.keys(categoryCounts).map(catSlug => {
    const details = getCategoryDetails(catSlug);
    return {
      slug: catSlug,
      name: details.name,
      description: details.description,
      count: categoryCounts[catSlug],
    };
  });
}
