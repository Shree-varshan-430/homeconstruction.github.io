import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostData, getSortedPostsData, getCategoryDetails } from "@/lib/posts";
import TOC from "@/components/TOC";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import AuthorCard from "@/components/AuthorCard";
import { Calendar, Clock, ChevronRight, User } from "lucide-react";
import { getBlogPostingSchema, getBreadcrumbSchema, getFAQSchema, siteConfig, getCanonicalUrl } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Extractor to parse Q&As from MDX for FAQ Accordion and Schema
function extractFaqs(content: string): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  const lines = content.split("\n");
  let currentQuestion = "";
  let currentAnswer = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("#### Q") || line.startsWith("### Q")) {
      if (currentQuestion && currentAnswer) {
        faqs.push({
          question: currentQuestion.trim(),
          answer: currentAnswer.trim()
        });
      }
      currentQuestion = line.replace(/^#{3,4}\s+Q\d+:\s*/, "");
      currentAnswer = "";
    } else if (line.startsWith("**A:**") || line.startsWith("A:")) {
      currentAnswer = line.replace(/^\*\*A:\*\*\s*/, "").replace(/^A:\s*/, "");
    } else if (currentQuestion && line && !line.startsWith("#")) {
      // Append content lines if they belong to the answer
      if (currentAnswer) {
        currentAnswer += " " + line;
      }
    }
  }

  if (currentQuestion && currentAnswer) {
    faqs.push({
      question: currentQuestion.trim(),
      answer: currentAnswer.trim()
    });
  }

  return faqs;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const url = getCanonicalUrl(`/blog/${post.slug}`);

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url: url,
      title: post.title,
      description: post.description,
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date(post.updated || post.date).toISOString(),
      authors: [siteConfig.companyUrl],
      images: [
        {
          url: post.image,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostData(slug);

  if (!post) {
    notFound();
  }

  const catDetails = getCategoryDetails(post.category);
  const faqs = extractFaqs(post.content);

  // SEO Schemas
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: catDetails.name, item: `/category/${post.category}` },
    { name: post.title, item: `/blog/${post.slug}` },
  ]);
  const blogPostingSchema = getBlogPostingSchema(post);
  const faqSchema = faqs.length > 0 ? getFAQSchema(faqs) : null;

  // Custom MDX Components
  const mdxComponents = {
    h2: (props: any) => {
      const text = props.children || "";
      const id = typeof text === "string" ? text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : "";
      return <h2 id={id} className="font-serif text-2xl font-bold mt-12 mb-6 border-b border-border-custom pb-2 scroll-mt-24" {...props} />;
    },
    h3: (props: any) => {
      const text = props.children || "";
      const id = typeof text === "string" ? text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : "";
      return <h3 id={id} className="font-serif text-xl font-bold mt-8 mb-4 scroll-mt-24" {...props} />;
    },
    // Filter alert tags inside blockquotes
    blockquote: (props: any) => {
      return (
        <div className="callout border-l-4 border-accent p-6 bg-white shadow-sm my-8 rounded-r">
          <div className="font-sans font-bold text-xs uppercase tracking-wider text-accent mb-2">
            Expert Note
          </div>
          <div className="text-sm sm:text-base text-secondary font-sans leading-relaxed">
            {props.children}
          </div>
        </div>
      );
    }
  };

  // Find related articles (same category, excluding current)
  const allPosts = getSortedPostsData();
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="pb-20">
      {/* Dynamic SEO Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Breadcrumb Navigation */}
      <div className="bg-card border-b border-border-custom py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center space-x-2 text-xs text-secondary font-sans">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href="/blog" className="hover:text-accent">
            Blog
          </Link>
          <ChevronRight className="h-3 w-3" />
          <Link href={`/category/${post.category}`} className="hover:text-accent">
            {catDetails.name}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-primary font-medium line-clamp-1">{post.title}</span>
        </div>
      </div>

      {/* Article Header Hero */}
      <header className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-12 text-center">
        <Link
          href={`/category/${post.category}`}
          className="inline-block bg-accent/5 text-[10px] font-sans font-bold uppercase tracking-widest text-accent px-4 py-1.5 mb-6 border border-accent/25 rounded-full"
        >
          {catDetails.name}
        </Link>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary leading-tight mb-8">
          {post.title}
        </h1>

        {/* Author Card Meta Row */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-secondary font-sans border-y border-border-custom/50 py-4 mb-12">
          <span className="flex items-center gap-1.5">
            <User className="h-4 w-4 text-accent" />
            {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-accent" />
            Published: {formattedDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-accent" />
            {post.readingTime}
          </span>
        </div>
      </header>

      {/* Featured Header Banner Image */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-16">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100 border border-border-custom shadow-md">
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Table of Contents Column */}
          <div className="lg:col-span-3">
            <TOC />
          </div>

          {/* Article Core Body Prose */}
          <div className="lg:col-span-9 max-w-[760px] mx-auto w-full">
            <div className="prose-editorial">
              <MDXRemote source={post.content} components={mdxComponents} />
            </div>

            {/* Author Profile */}
            <AuthorCard author={post.author} date={post.date} updated={post.updated} />

            {/* FAQ Block */}
            {faqs.length > 0 && <FAQ items={faqs} />}

            {/* In-content CTA */}
            <CTA />

            {/* Related Posts Grid */}
            {relatedPosts.length > 0 && (
              <section className="border-t border-border-custom pt-12 mt-12">
                <h3 className="font-serif text-2xl font-bold mb-8">Related Journal Guides</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.slug} className="group flex flex-col bg-card border border-border-custom">
                      <Link href={`/blog/${relatedPost.slug}`} className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                        <img src={relatedPost.image} alt={relatedPost.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      </Link>
                      <div className="p-4 flex-grow flex flex-col justify-between">
                        <h4 className="font-serif text-sm font-bold text-primary group-hover:text-accent line-clamp-2 mb-4">
                          <Link href={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                        </h4>
                        <Link href={`/blog/${relatedPost.slug}`} className="text-[10px] font-sans font-bold tracking-wider text-accent group-hover:text-gold uppercase">
                          Read Guide →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
