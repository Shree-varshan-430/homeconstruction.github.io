import Link from "next/link";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { getCategoryDetails } from "@/lib/categories";

interface FeaturedPostProps {
  post: {
    slug: string;
    title: string;
    description: string;
    date: string;
    category: string;
    readingTime: string;
    image: string;
    author: string;
  };
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const catDetails = getCategoryDetails(post.category);
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative overflow-hidden bg-card border border-border-custom hover:shadow-xl transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Image Grid */}
        <Link href={`/blog/${post.slug}`} className="relative h-64 lg:h-auto lg:col-span-7 block overflow-hidden bg-stone-100 min-h-[300px]">
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-102"
            loading="eager"
          />
          <div className="absolute top-6 left-6 bg-accent px-4 py-1.5 text-xs font-sans font-bold uppercase tracking-wider text-white">
            Featured Guide
          </div>
        </Link>

        {/* Content Grid */}
        <div className="flex flex-col justify-center p-8 sm:p-12 lg:col-span-5">
          <Link href={`/category/${post.category}`} className="inline-block self-start text-xs font-sans font-bold uppercase tracking-widest text-gold hover:text-accent mb-4">
            {catDetails.name}
          </Link>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight tracking-tight mb-4 hover:text-accent transition-colors">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h2>

          <p className="text-secondary text-base font-sans line-clamp-4 leading-relaxed mb-6">
            {post.description}
          </p>

          <div className="flex items-center space-x-6 text-xs text-secondary font-sans mb-8 border-t border-border-custom/50 pt-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readingTime}
            </span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center justify-center gap-2 border border-primary bg-primary px-8 py-3.5 text-xs font-semibold tracking-widest uppercase text-white transition-all hover:bg-accent hover:border-accent self-start"
          >
            Read Editorial
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
