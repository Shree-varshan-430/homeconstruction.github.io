"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: "Find a Service", href: "/search" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" }
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false;
    return pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border-custom bg-bg/85 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="group flex flex-col">
              <span className="font-serif text-xl font-bold tracking-tight uppercase text-primary transition-colors group-hover:text-accent">
                GK Editorial
              </span>
              <span className="text-[10px] tracking-widest uppercase text-gold font-sans font-semibold">
                Home Construction
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-sans text-sm font-medium tracking-wide uppercase transition-colors hover:text-accent ${
                  isActive(item.href) ? "text-accent font-semibold" : "text-primary/70"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="https://gkhomeconstruction.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 border border-accent bg-accent px-5 py-2.5 font-sans text-xs font-semibold tracking-wider uppercase text-white transition-all hover:bg-transparent hover:text-accent hover:shadow-sm"
            >
              Consult Experts
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 text-primary hover:text-accent focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-border-custom bg-card px-4 pt-2 pb-6 space-y-3 transition-all duration-300">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 font-sans text-sm font-medium tracking-wide uppercase ${
                isActive(item.href) ? "text-accent font-semibold bg-bg" : "text-primary/70 hover:text-accent hover:bg-bg/50"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-2 px-3">
            <a
              href="https://gkhomeconstruction.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-1 border border-accent bg-accent py-3 font-sans text-xs font-semibold tracking-wider uppercase text-white transition-all hover:bg-transparent hover:text-accent"
            >
              Consult Experts
              <ArrowUpRight className="h-3 text-white group-hover:text-accent" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
