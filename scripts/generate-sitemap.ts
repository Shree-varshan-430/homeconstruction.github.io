import fs from "fs";
import path from "path";

const BASE_URL = "https://shree-varshan-430.github.io/homeconstruction.github.io";

// Read all blog slugs from content/blog/
const contentDir = path.join(process.cwd(), "content", "blog");
const slugs = fs
  .readdirSync(contentDir)
  .filter((f) => f.endsWith(".mdx"))
  .map((f) => f.replace(/\.mdx$/, ""));

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
  "renovation",
];

const today = new Date().toISOString().split("T")[0];

function url(loc: string, priority: string, changefreq: string, lastmod: string) {
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

const entries: string[] = [
  url(BASE_URL, "1.0", "daily", today),
  url(`${BASE_URL}/blog`, "0.9", "daily", today),
  url(`${BASE_URL}/categories`, "0.8", "monthly", today),
  url(`${BASE_URL}/about`, "0.8", "monthly", today),
  ...categories.map((cat) => url(`${BASE_URL}/category/${cat}`, "0.6", "weekly", today)),
  ...slugs.map((slug) => url(`${BASE_URL}/blog/${slug}`, "0.7", "weekly", today)),
];

// IMPORTANT: XML declaration must be the very first bytes — no BOM, no leading whitespace
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>`;

const outputPath = path.join(process.cwd(), "public", "sitemap.xml");

// Write with explicit UTF-8 encoding (no BOM)
fs.writeFileSync(outputPath, xml, { encoding: "utf8" });

console.log(`✅ sitemap.xml generated with ${entries.length} URLs → public/sitemap.xml`);
