export const siteConfig = {
  title: "GK Home Construction Editorial - Bangalore's Premium Construction Guide",
  description: "Expert editorial guides on home construction, interior design, waterproofing, floor plans, and renovations in Bangalore. Learn Vastu guidelines, material checklists, and cost estimators.",
  siteUrl: "https://Shree-varshan-430.github.io/homeconstruction.github.io",
  companyUrl: "https://gkhomeconstruction.com",
  author: "GK Home Construction Editorial",
  logoUrl: "https://Shree-varshan-430.github.io/homeconstruction.github.io/images/logo.png"
};

// Generates correct Canonical URLs automatically
export function getCanonicalUrl(pathStr: string): string {
  const cleanPath = pathStr.startsWith("/") ? pathStr : `/${pathStr}`;
  return `${siteConfig.siteUrl}${cleanPath === "/" ? "" : cleanPath}`;
}

// Organization Schema (JSON-LD)
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.siteUrl}/#organization`,
    "name": "GK Home Construction Editorial",
    "url": siteConfig.siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": siteConfig.logoUrl,
      "caption": "GK Home Construction"
    },
    "sameAs": [
      siteConfig.companyUrl
    ]
  };
}

// WebSite and SearchAction Schema
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.siteUrl}/#website`,
    "name": "GK Home Construction Editorial",
    "url": siteConfig.siteUrl,
    "description": siteConfig.description,
    "publisher": {
      "@id": `${siteConfig.siteUrl}/#organization`
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteConfig.siteUrl}/blog?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

// Breadcrumb Schema
export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item.startsWith("http") ? item.item : `${siteConfig.siteUrl}${item.item}`
    }))
  };
}

// BlogPosting Schema
export function getBlogPostingSchema(post: {
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string;
  updated: string;
  author: string;
}) {
  const url = `${siteConfig.siteUrl}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "headline": post.title,
    "description": post.description,
    "image": post.image.startsWith("http") ? post.image : `${siteConfig.siteUrl}${post.image}`,
    "datePublished": new Date(post.date).toISOString(),
    "dateModified": new Date(post.updated || post.date).toISOString(),
    "author": {
      "@type": "Organization",
      "name": post.author,
      "url": siteConfig.companyUrl
    },
    "publisher": {
      "@id": `${siteConfig.siteUrl}/#organization`
    }
  };
}

// FAQ Page Schema
export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
