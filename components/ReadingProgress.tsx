"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.documentElement;
      const scrollHeight = element.scrollHeight - element.clientHeight;
      if (scrollHeight === 0) {
        setCompletion(0);
        return;
      }
      const scrollPosition = element.scrollTop;
      const percentage = (scrollPosition / scrollHeight) * 100;
      setCompletion(percentage);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on load
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 w-full h-1 z-[100] bg-border-custom/30 pointer-events-none">
      <div
        className="h-full bg-accent transition-all duration-75 ease-out"
        style={{ width: `${completion}%` }}
        role="progressbar"
        aria-label="Reading Progress"
        aria-valuenow={Math.round(completion)}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
