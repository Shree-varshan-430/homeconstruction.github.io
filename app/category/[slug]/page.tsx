import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSortedPostsData, getCategoryDetails } from "@/lib/posts";
import BlogCard from "@/components/BlogCard";
import Newsletter from "@/components/Newsletter";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { getBreadcrumbSchema, getCanonicalUrl } from "@/lib/seo";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
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
    "renovation"
  ];
  return categories.map((cat) => ({
    slug: cat,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const catDetails = getCategoryDetails(slug);
  const url = getCanonicalUrl(`/category/${slug}`);

  return {
    title: `${catDetails.name} Articles & Home Planning Guides`,
    description: catDetails.description,
    alternates: {
      canonical: url,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const catDetails = getCategoryDetails(slug);
  const posts = getSortedPostsData(slug);

  if (posts.length === 0 && !catDetails.name) {
    notFound();
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Categories", item: "/categories" },
    { name: catDetails.name, item: `/category/${slug}` },
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs text-secondary font-sans mb-8">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/categories" className="hover:text-accent">
          Categories
        </Link>
        <ChevronRight className="h-3 w-3 animate-pulse" />
        <span className="text-primary font-medium">{catDetails.name}</span>
      </div>

      {/* Category Header */}
      <div className="border-b border-border-custom pb-10 mb-12">
        <div className="max-w-3xl">
          <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-accent bg-accent/5 border border-accent/25 px-3 py-1 inline-block mb-4">
            Journal Category
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-primary mb-4">
            {catDetails.name}
          </h1>
          <p className="text-secondary text-base sm:text-lg font-sans leading-relaxed">
            {catDetails.description}
          </p>
        </div>
      </div>

      {/* Grid of articles */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-card border border-border-custom">
          <h2 className="font-serif text-xl font-bold mb-2">No Articles Yet</h2>
          <p className="text-secondary text-sm font-sans mb-6">
            We are currently drafting educational guides for this category.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 border border-primary bg-primary text-white px-6 py-3 text-xs font-bold tracking-widest uppercase hover:bg-accent hover:border-accent"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to Journal Directory
          </Link>
        </div>
      )}

      <Newsletter />
    </div>
  );
}
