import { getSortedPostsData, getAllCategories } from "@/lib/posts";
import SearchFilter from "@/components/SearchFilter";
import Newsletter from "@/components/Newsletter";
import { siteConfig } from "@/lib/seo";

export const metadata = {
  title: "The Editorial Journal - Expert Home Construction & Design Guides",
  description: "Browse our collection of 50+ detailed guides on home construction cost estimation, structural concrete, Vastu planning, and luxury interiors in Bangalore.",
};

export default function BlogIndex() {
  const allPosts = getSortedPostsData();
  const categories = getAllCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-accent bg-accent/5 border border-accent/25 px-3 py-1 inline-block">
          The Journal Directory
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-primary">
          GK Home Construction Editorial
        </h1>
        <p className="text-secondary text-sm sm:text-base font-sans leading-relaxed">
          In-depth educational articles, cost spec charts, material selection guides, and architectural designs written by professional engineers to help Bangalore homeowners build and design their dream spaces.
        </p>
      </div>

      {/* Interactive client filter and list */}
      <SearchFilter initialPosts={allPosts} categories={categories} />

      <Newsletter />
    </div>
  );
}
