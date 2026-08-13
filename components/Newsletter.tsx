"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="bg-card border-y border-border-custom py-16 sm:py-20 my-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-accent mb-3 inline-block">
            Subscribe to Our Journal
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-primary mb-4">
            Receive Premium Architectural Insights
          </h2>
          <p className="text-secondary text-sm sm:text-base font-sans leading-relaxed mb-8">
            Get bi-weekly educational guides on Vastu layouts, home construction costing indexes, and interior design trends in Bangalore, direct to your inbox. No spam.
          </p>

          {submitted ? (
            <div className="inline-flex items-center gap-2 bg-accent/5 border border-accent/20 px-6 py-4 text-accent font-sans text-sm font-semibold rounded-sm">
              <CheckCircle2 className="h-5 w-5 text-accent" />
              Thank you! You have subscribed to the editorial newsletter.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 border border-border-custom bg-bg px-4 py-3 text-sm font-sans placeholder-secondary/50 focus:border-accent focus:outline-none focus:ring-0"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 border border-primary bg-primary hover:bg-accent hover:border-accent text-white px-6 py-3 font-sans text-xs font-semibold tracking-widest uppercase transition-all duration-300 w-full sm:w-auto"
              >
                Join
                <Send className="h-3 w-3" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
