import Link from "next/link";
import { Clock, Calendar } from "lucide-react";
import { getCategoryDetails } from "@/lib/categories";

interface PostCardProps {
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

export default function BlogCard({ post }: PostCardProps) {
  const catDetails = getCategoryDetails(post.category);
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="group flex flex-col overflow-hidden bg-card border border-border-custom hover:shadow-xl transition-all duration-300">
      {/* 5:4 Aspect Image */}
      <Link href={`/blog/${post.slug}`} className="relative aspect-[5/4] block overflow-hidden bg-stone-100">
        <img
          src={post.image}
          alt={post.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 bg-bg/90 backdrop-blur-sm px-3 py-1 text-[10px] font-sans font-bold uppercase tracking-wider text-accent border border-border-custom">
          {catDetails.name}
        </div>
      </Link>

      {/* Card Body */}
      <div className="flex flex-1 flex-col p-6">
        {/* Meta Info */}
        <div className="flex items-center space-x-4 text-xs text-secondary font-sans mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readingTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl font-bold leading-snug mb-3 group-hover:text-accent transition-colors">
          <Link href={`/blog/${post.slug}`} className="line-clamp-2">
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-secondary text-sm font-sans line-clamp-3 leading-relaxed mb-6 flex-1">
          {post.description}
        </p>

        {/* Read More Link */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center font-sans text-xs font-bold tracking-widest uppercase text-accent group-hover:text-gold transition-colors"
        >
          Read Article
          <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </article>
  );
}
