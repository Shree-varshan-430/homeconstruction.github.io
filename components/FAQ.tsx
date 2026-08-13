"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="my-16 border-t border-b border-border-custom py-12">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-border-custom bg-card transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between p-5 text-left font-serif text-base sm:text-lg font-bold text-primary hover:text-accent focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-accent shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-[500px] border-t border-border-custom/50" : "max-h-0"
                  }`}
                >
                  <p className="p-5 text-secondary text-sm sm:text-base font-sans leading-relaxed bg-bg/30">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
