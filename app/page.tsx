import Link from "next/link";
import { getSortedPostsData, getAllCategories, getCategoryDetails } from "@/lib/posts";
import Hero from "@/components/Hero";
import BlogCard from "@/components/BlogCard";
import FeaturedPost from "@/components/FeaturedPost";
import Newsletter from "@/components/Newsletter";
import { ArrowRight, BookOpen, Sparkles, Hammer, HardHat, Compass } from "lucide-react";
import { getWebSiteSchema, getOrganizationSchema } from "@/lib/seo";

export default function Home() {
  const allPosts = getSortedPostsData();

  // Pick Hero post (featured post with latest date)
  const heroPost = allPosts.find(p => p.featured) || allPosts[0];

  // Pick other featured posts
  const featuredPosts = allPosts
    .filter(p => p.featured && p.slug !== heroPost.slug)
    .slice(0, 3);

  // Latest posts excluding hero
  const latestPosts = allPosts
    .filter(p => p.slug !== heroPost.slug)
    .slice(0, 6);

  // Curated collections
  const interiorCollection = allPosts
    .filter(p =>
      ["bedroom-design", "living-room", "modular-kitchen", "wardrobes", "bathroom-design"].includes(p.category) &&
      p.slug !== heroPost.slug
    )
    .slice(0, 4);

  const constructionCollection = allPosts
    .filter(p =>
      ["construction-cost", "waterproofing", "floor-plans", "vastu-planning", "renovation"].includes(p.category) &&
      p.slug !== heroPost.slug
    )
    .slice(0, 4);

  const categories = getAllCategories();

  // Structured schemas for homepage
  const websiteSchema = getWebSiteSchema();
  const orgSchema = getOrganizationSchema();

  return (
    <div className="space-y-20 pb-20">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      {/* Hero Header */}
      {heroPost && <Hero post={heroPost} />}

      {/* Categories Bar & Search Redirection */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <div className="border-b border-border-custom pb-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="font-serif text-sm font-bold uppercase tracking-wider text-accent mb-2">
              Browse by Journal Category
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="bg-card hover:bg-accent border border-border-custom hover:border-accent text-primary hover:text-white px-3 py-1.5 text-xs font-sans font-bold uppercase tracking-wider transition-colors duration-200"
                >
                  {cat.name} ({cat.count})
                </Link>
              ))}
            </div>
          </div>
          {/* Quick Search Entry */}
          <div className="w-full md:w-auto">
            <form action="/blog" method="GET" className="relative">
              <input
                type="text"
                name="search"
                placeholder="Search articles..."
                className="w-full md:w-64 border border-border-custom bg-card px-4 py-2.5 text-xs font-sans focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-sans font-bold text-accent"
              >
                Go
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      {featuredPosts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 border-b border-border-custom pb-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-accent" />
              Featured Masterpieces
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Curated Magazines Grid Split */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-card border-y border-border-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Interior Design Collection */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b border-border-custom pb-4">
              <BookOpen className="h-6 w-6 text-accent" />
              <div>
                <h3 className="font-serif text-2xl font-bold">The Interior Collection</h3>
                <p className="text-secondary text-xs font-sans uppercase tracking-wider">Aesthetic & space solutions</p>
              </div>
            </div>
            <div className="space-y-6">
              {interiorCollection.map(post => (
                <div key={post.slug} className="group flex gap-4 items-center border-b border-border-custom/50 pb-4 last:border-0 last:pb-0">
                  <Link href={`/blog/${post.slug}`} className="relative h-20 w-24 shrink-0 overflow-hidden bg-stone-100">
                    <img src={post.image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105" />
                  </Link>
                  <div>
                    <span className="text-[10px] font-sans font-bold uppercase text-gold tracking-widest block mb-1">
                      {getCategoryDetails(post.category).name}
                    </span>
                    <h4 className="font-serif text-base font-bold text-primary group-hover:text-accent transition-colors line-clamp-1">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h4>
                    <p className="text-secondary text-xs line-clamp-2 mt-1">{post.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Construction & Waterproofing Collection */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b border-border-custom pb-4">
              <Hammer className="h-6 w-6 text-accent" />
              <div>
                <h3 className="font-serif text-2xl font-bold">The Construction Journal</h3>
                <p className="text-secondary text-xs font-sans uppercase tracking-wider">Civil specifications & budgets</p>
              </div>
            </div>
            <div className="space-y-6">
              {constructionCollection.map(post => (
                <div key={post.slug} className="group flex gap-4 items-center border-b border-border-custom/50 pb-4 last:border-0 last:pb-0">
                  <Link href={`/blog/${post.slug}`} className="relative h-20 w-24 shrink-0 overflow-hidden bg-stone-100">
                    <img src={post.image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105" />
                  </Link>
                  <div>
                    <span className="text-[10px] font-sans font-bold uppercase text-gold tracking-widest block mb-1">
                      {getCategoryDetails(post.category).name}
                    </span>
                    <h4 className="font-serif text-base font-bold text-primary group-hover:text-accent transition-colors line-clamp-1">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h4>
                    <p className="text-secondary text-xs line-clamp-2 mt-1">{post.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 border-b border-border-custom pb-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <HardHat className="h-6 w-6 text-accent" />
            Latest Practical Guides
          </h2>
          <Link
            href="/blog"
            className="font-sans text-xs font-bold tracking-widest uppercase text-accent hover:text-gold transition-colors inline-flex items-center gap-1"
          >
            All Editorial Journals
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
