"use client";

import { useEffect, useState, useRef } from "react";
import { AlignLeft } from "lucide-react";

interface TouchHeading {
  id: string;
  text: string;
  level: number;
}

export default function TOC() {
  const [headings, setHeadings] = useState<TouchHeading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Select all H2 and H3 elements within the article prose container
    const articleSelector = document.querySelector(".prose-editorial");
    if (!articleSelector) return;

    const headingElements = articleSelector.querySelectorAll("h2, h3");
    const parsedHeadings: TouchHeading[] = [];

    headingElements.forEach((el, index) => {
      const text = el.textContent || "";
      // Ensure the heading has a slugified ID for linking if it doesn't already
      let id = el.id;
      if (!id) {
        id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        el.id = `${id}-${index}`;
      }

      parsedHeadings.push({
        id: el.id,
        text,
        level: el.tagName === "H2" ? 2 : 3,
      });
    });

    setHeadings(parsedHeadings);

    // IntersectionObserver to watch which heading is active
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find entries that are intersecting
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Set the active heading to the first visible one
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px", // Offset for sticky navbar
        threshold: 0.1,
      }
    );

    headingElements.forEach((el) => {
      if (observerRef.current) observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
    }
  };

  if (headings.length === 0) return null;

  return (
    <aside className="hidden lg:block w-full sticky top-28 self-start pr-6 max-h-[calc(100vh-140px)] overflow-y-auto border-r border-border-custom/50 py-2">
      <div className="flex items-center gap-2 font-serif text-sm font-bold uppercase tracking-wider text-primary mb-4">
        <AlignLeft className="h-4 w-4 text-accent" />
        Table of Contents
      </div>
      <nav className="space-y-1">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            onClick={(e) => handleClick(e, heading.id)}
            className={`block text-xs transition-all duration-200 py-1.5 border-l-2 leading-relaxed ${
              heading.level === 2 ? "pl-3 font-semibold" : "pl-6 text-stone-500"
            } ${
              activeId === heading.id
                ? "text-accent border-accent font-medium bg-accent/5"
                : "text-secondary border-transparent hover:text-primary hover:border-stone-300"
            }`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
