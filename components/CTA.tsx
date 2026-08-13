import { ArrowUpRight } from "lucide-react";

interface CTAProps {
  buttonText?: string;
  link?: string;
}

export default function CTA({
  buttonText = "Explore Interior Services",
  link = "https://gkhomeconstruction.com",
}: CTAProps) {
  return (
    <div className="relative overflow-hidden bg-accent px-6 py-16 sm:px-12 sm:py-20 border border-accent/20 my-16 shadow-xl">
      {/* Decorative Gold Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl -mr-16 -mt-16" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold/5 rounded-full blur-3xl -ml-24 -mb-24" />

      <div className="relative mx-auto max-w-3xl text-center z-10">
        <span className="text-[10px] sm:text-xs font-sans font-semibold tracking-widest uppercase text-gold bg-black/25 px-4 py-1.5 rounded-full border border-gold/25 inline-block mb-6">
          Bangalore Residential Services
        </span>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6 leading-tight">
          Planning your dream home in Bangalore?
        </h2>

        <p className="mx-auto max-w-2xl text-stone-200 text-sm sm:text-base font-sans leading-relaxed mb-10">
          Get professional interior design, house construction, waterproofing, modular kitchen, and renovation services from GK Home Construction. Our team delivers vastu-compliant, premium engineering and aesthetic designs across Bangalore.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 bg-gold hover:bg-white text-primary hover:text-accent font-sans text-xs sm:text-sm font-bold tracking-widest uppercase px-8 py-4 shadow-md transition-all duration-300 w-full sm:w-auto"
          >
            {buttonText}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="https://gkhomeconstruction.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-white/20 hover:border-white bg-white/5 hover:bg-white/10 text-white font-sans text-xs sm:text-sm font-bold tracking-widest uppercase px-8 py-4 transition-all duration-300 w-full sm:w-auto"
          >
            Get Free Quote
          </a>
        </div>
      </div>
    </div>
  );
}
