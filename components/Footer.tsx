import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white font-sans border-t border-border-custom/20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <Link href="/" className="flex flex-col mb-4">
                <span className="font-serif text-2xl font-bold tracking-tight uppercase text-white">
                  GK Editorial
                </span>
                <span className="text-[10px] tracking-widest uppercase text-gold font-semibold">
                  Home Construction
                </span>
              </Link>
              <p className="text-stone-300 text-sm leading-relaxed max-w-sm">
                Educational content by GK Home Construction. Read expert guides for homeowners planning to build or renovate in Bangalore.
              </p>
            </div>
            <a
              href="https://gkhomeconstruction.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 self-start text-xs font-bold text-gold hover:text-white transition-colors uppercase tracking-wider"
            >
              Visit GK Home Construction
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3">
            <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-gold mb-6 border-b border-white/10 pb-2">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-stone-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-stone-300 hover:text-white transition-colors">
                  Blog Listings
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-stone-300 hover:text-white transition-colors">
                  All Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-stone-300 hover:text-white transition-colors">
                  About the Editorial
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories directory */}
          <div className="md:col-span-4">
            <h4 className="font-serif text-sm font-bold uppercase tracking-widest text-gold mb-6 border-b border-white/10 pb-2">
              Featured Categories
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
              <Link href="/category/bedroom-design" className="text-stone-300 hover:text-white transition-colors">
                Interior Design
              </Link>
              <Link href="/category/construction-cost" className="text-stone-300 hover:text-white transition-colors">
                Construction Cost
              </Link>
              <Link href="/category/waterproofing" className="text-stone-300 hover:text-white transition-colors">
                Waterproofing
              </Link>
              <Link href="/category/floor-plans" className="text-stone-300 hover:text-white transition-colors">
                Floor Plans
              </Link>
              <Link href="/category/vastu-planning" className="text-stone-300 hover:text-white transition-colors">
                Vastu Planning
              </Link>
              <Link href="/category/modular-kitchen" className="text-stone-300 hover:text-white transition-colors">
                Modular Kitchen
              </Link>
              <Link href="/category/bathroom-design" className="text-stone-300 hover:text-white transition-colors">
                Bathroom Design
              </Link>
              <Link href="/category/renovation" className="text-stone-300 hover:text-white transition-colors">
                Renovations
              </Link>
            </div>
          </div>
        </div>

        {/* Sub Footer */}
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-400">
          <p>© {currentYear} GK Home Construction. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">
              Sitemap
            </Link>
            <Link href="/feed.xml" className="hover:text-white transition-colors">
              RSS Feed
            </Link>
            <a href="https://gkhomeconstruction.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GK Services
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
