import Link from "next/link";
import { getAllCategories } from "@/lib/posts";
import Newsletter from "@/components/Newsletter";
import { ChevronRight, Layers, ArrowRight } from "lucide-react";
import { getBreadcrumbSchema, getCanonicalUrl } from "@/lib/seo";

export const metadata = {
  title: "Categories - GK Home Construction Editorial Journal",
  description: "Browse our 10 editorial categories, from modern bedroom design and modular kitchens to house construction costing and waterproofing in Bangalore.",
};

export default function CategoriesIndex() {
  const categories = getAllCategories();

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Categories", item: "/categories" },
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
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
        <span className="text-primary font-medium">Categories</span>
      </div>

      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-accent bg-accent/5 border border-accent/25 px-3 py-1 inline-block">
          The Journal Directory
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-primary">
          Explore by Design & Construction Topic
        </h1>
        <p className="text-secondary text-sm sm:text-base font-sans leading-relaxed">
          Navigate through our segmented collections. Each category compiles expert engineering checklists, material reviews, Vastu layouts, and design guides tailored for Bangalore houses.
        </p>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {categories.map((cat) => (
          <div
            key={cat.slug}
            className="group flex flex-col justify-between p-8 bg-card border border-border-custom hover:border-accent hover:shadow-lg transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-border-custom/50 pb-4">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-gold">
                  {cat.count} published {cat.count === 1 ? "guide" : "guides"}
                </span>
                <Layers className="h-4 w-4 text-accent" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-primary group-hover:text-accent transition-colors mb-3">
                <Link href={`/category/${cat.slug}`}>{cat.name}</Link>
              </h2>
              <p className="text-secondary text-sm font-sans leading-relaxed mb-8">
                {cat.description}
              </p>
            </div>
            <Link
              href={`/category/${cat.slug}`}
              className="inline-flex items-center gap-1 text-xs font-sans font-bold uppercase tracking-widest text-accent group-hover:text-gold transition-colors mt-auto self-start"
            >
              Enter Topic Hub
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        ))}
      </div>

      <Newsletter />
    </div>
  );
}
