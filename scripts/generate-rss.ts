import fs from "fs";
import path from "path";
import matter from "gray-matter";
import RSS from "rss";

const postsDirectory = path.join(process.cwd(), "content/blog");
const publicDirectory = path.join(process.cwd(), "public");

if (!fs.existsSync(publicDirectory)) {
  fs.mkdirSync(publicDirectory, { recursive: true });
}

function generateRssFeed() {
  const feed = new RSS({
    title: "GK Home Construction Editorial Blog",
    description: "Premium editorial articles and expert educational guides on home construction, Vastu planning, interior designs, and waterproofing for Bangalore homeowners.",
    feed_url: "https://homeconstruction.github.io/feed.xml",
    site_url: "https://homeconstruction.github.io",
    image_url: "https://homeconstruction.github.io/images/logo.png",
    managingEditor: "GK Home Construction Editorial",
    webMaster: "GK Home Construction Editorial",
    copyright: "2026 GK Home Construction",
    language: "en",
    pubDate: new Date().toUTCString(),
    ttl: 60
  });

  if (fs.existsSync(postsDirectory)) {
    const fileNames = fs.readdirSync(postsDirectory);
    const posts = fileNames
      .filter(fileName => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
      .map(fileName => {
        const slug = fileName.replace(/\.mdx$/, "").replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);

        return {
          slug,
          title: matterResult.data.title || "",
          description: matterResult.data.description || "",
          date: matterResult.data.date || "",
          author: matterResult.data.author || "GK Home Construction Editorial",
          content: matterResult.content
        };
      });

    // Sort by date newest first
    posts.sort((a, b) => (a.date < b.date ? 1 : -1));

    // Add items to feed
    posts.forEach(post => {
      feed.item({
        title: post.title,
        description: post.description,
        url: `https://homeconstruction.github.io/blog/${post.slug}`,
        author: post.author,
        date: post.date,
        custom_elements: [
          { "content:encoded": post.content }
        ]
      });
    });
  }

  const xml = feed.xml({ indent: true });
  fs.writeFileSync(path.join(publicDirectory, "feed.xml"), xml, "utf8");
  console.log("RSS Feed (public/feed.xml) generated successfully.");
}

generateRssFeed();
