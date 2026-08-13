import Link from "next/link";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { getCategoryDetails } from "@/lib/categories";

interface HeroProps {
  post: {
    slug: string;
    title: string;
    description: string;
    date: string;
    category: string;
    readingTime: string;
    image: string;
  };
}

export default function Hero({ post }: HeroProps) {
  const catDetails = getCategoryDetails(post.category);
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="relative w-full h-[65vh] min-h-[500px] flex items-end overflow-hidden border-b border-border-custom bg-black">
      {/* Background Image */}
      <img
        src={post.image}
        alt={post.title}
        className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-10000 scale-102 hover:scale-100"
        loading="eager"
      />
      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

      {/* Content Container */}
      <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20 z-10">
        <div className="max-w-3xl">
          <Link
            href={`/category/${post.category}`}
            className="inline-block bg-gold/90 text-[10px] font-sans font-bold uppercase tracking-widest text-primary px-3 py-1 mb-4 border border-gold"
          >
            {catDetails.name}
          </Link>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-4 drop-shadow-sm">
            <Link href={`/blog/${post.slug}`} className="hover:text-gold transition-colors">
              {post.title}
            </Link>
          </h1>

          <p className="text-stone-300 text-sm sm:text-lg font-sans line-clamp-2 leading-relaxed mb-6 max-w-2xl drop-shadow-sm">
            {post.description}
          </p>

          <div className="flex items-center space-x-6 text-xs text-stone-400 font-sans mb-8">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-gold" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-gold" />
              {post.readingTime}
            </span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white/10 hover:bg-white hover:text-primary backdrop-blur-sm px-8 py-3.5 text-xs font-semibold tracking-widest uppercase text-white transition-all duration-300 self-start"
          >
            Read Editorial Cover
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
