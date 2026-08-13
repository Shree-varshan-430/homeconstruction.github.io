"use client";

import { useState, useMemo } from "react";
import BlogCard from "./BlogCard";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: string;
  image: string;
}

interface SearchFilterProps {
  initialPosts: Post[];
  categories: { slug: string; name: string }[];
}

export default function SearchFilter({ initialPosts, categories }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  const [visibleCount, setVisibleCount] = useState(9); // Initial page size

  // Filter and sort logic combined
  const filteredAndSortedPosts = useMemo(() => {
    let result = [...initialPosts];

    // Filter by Category
    if (selectedCategory) {
      result = result.filter(post => post.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        post =>
          post.title.toLowerCase().includes(q) ||
          post.description.toLowerCase().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [initialPosts, selectedCategory, searchQuery, sortBy]);

  const displayedPosts = useMemo(() => {
    return filteredAndSortedPosts.slice(0, visibleCount);
  }, [filteredAndSortedPosts, visibleCount]);

  const hasMore = filteredAndSortedPosts.length > visibleCount;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(selectedCategory === slug ? null : slug);
    setVisibleCount(9); // Reset pagination size on filter change
  };

  return (
    <div className="space-y-10">
      {/* Search & Sort Panel */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card p-6 border border-border-custom shadow-sm">
        {/* Search Input */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(9);
            }}
            placeholder="Search guides, cost tips, vastu rules..."
            className="w-full pl-11 pr-4 py-3 border border-border-custom bg-bg text-sm font-sans placeholder-secondary/50 focus:border-accent focus:outline-none"
          />
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2 text-xs font-sans text-secondary uppercase tracking-wider">
            <ArrowUpDown className="h-4 w-4 text-accent" />
            Sort By:
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "newest" | "oldest")}
            className="border border-border-custom bg-bg px-3 py-2.5 text-xs font-sans font-bold uppercase tracking-wider text-primary focus:border-accent focus:outline-none cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Category Chips Scroll */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-sans text-secondary uppercase tracking-wider">
          <SlidersHorizontal className="h-3.5 w-3.5 text-accent" />
          Filter by Topic:
        </div>
        <div className="flex gap-2 overflow-x-auto pb-3 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => {
              setSelectedCategory(null);
              setVisibleCount(9);
            }}
            className={`px-4 py-2 border text-xs font-sans font-semibold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 ${
              selectedCategory === null
                ? "bg-accent border-accent text-white"
                : "bg-card border-border-custom text-primary hover:border-accent"
            }`}
          >
            All Guides
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleCategorySelect(cat.slug)}
              className={`px-4 py-2 border text-xs font-sans font-semibold uppercase tracking-wider transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === cat.slug
                  ? "bg-accent border-accent text-white"
                  : "bg-card border-border-custom text-primary hover:border-accent"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Article Count / Status */}
      <div className="text-xs font-sans text-secondary">
        Showing {filteredAndSortedPosts.length} {filteredAndSortedPosts.length === 1 ? "article" : "articles"}
        {selectedCategory && ` under ${categories.find(c => c.slug === selectedCategory)?.name}`}
      </div>

      {/* 3-Column Grid */}
      {displayedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-border-custom bg-card">
          <h3 className="font-serif text-lg font-bold mb-2">No Articles Found</h3>
          <p className="text-secondary text-sm font-sans">
            Try adjusting your search keywords or topic filter.
          </p>
        </div>
      )}

      {/* Infinite Pagination Load More Button */}
      {hasMore && (
        <div className="flex justify-center pt-8">
          <button
            onClick={handleLoadMore}
            className="border border-primary hover:border-accent bg-transparent hover:bg-accent text-primary hover:text-white px-10 py-4 font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300"
          >
            Load More Articles
          </button>
        </div>
      )}
    </div>
  );
}
