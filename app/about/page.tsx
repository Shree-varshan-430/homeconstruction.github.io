import Link from "next/link";
import { ChevronRight, Award, Compass, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import CTA from "@/components/CTA";
import { getBreadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "About the Editorial - GK Home Construction Bangalore",
  description: "Learn about the GK Home Construction Editorial Team. Our mission is to educate Bangalore homeowners about structural engineering, Vastu Shastra rules, and cost-effective design.",
};

export default function AboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "About", item: "/about" },
  ]);

  return (
    <div className="pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumbs */}
      <div className="bg-card border-b border-border-custom py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center space-x-2 text-xs text-secondary font-sans">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-primary font-medium">About the Editorial</span>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Cover Section */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-[10px] font-sans font-bold tracking-widest uppercase text-accent bg-accent/5 border border-accent/25 px-3 py-1 inline-block">
            Our Mission & Story
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-primary">
            Demystifying Home Building for Bangalore
          </h1>
          <p className="text-secondary text-sm sm:text-base font-sans leading-relaxed max-w-2xl mx-auto">
            We believe that building a home is a milestone. Our editorial journal provides homeowners with transparent specifications, costing models, Vastu layouts, and interior options.
          </p>
        </div>

        {/* Brand Description Image */}
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-stone-100 border border-border-custom mb-16 shadow-sm">
          <img
            src="/homeconstruction.github.io/images/construction-cost.jpg"
            alt="Residential construction site supervision in Bangalore"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Content Body */}
        <div className="prose-editorial space-y-8 font-sans">
          <p>
            Welcome to the <strong>GK Home Construction Editorial</strong> platform. This website is not a standard corporate website; it is an educational journal and directory created by local engineers, architects, and structural designers in Bangalore. Our writing style is inspired by global architectural journals like <em>Dezeen</em>, <em>Architectural Digest</em>, and <em>Houzz</em>, but completely tailored for Indian homeowners.
          </p>
          <p>
            Bangalore is a unique market. The red soil in East Bangalore demands different footing columns than the hard rocky ground in the West. The seasonal monsoon swings require advanced waterproofing membranes rather than basic cement washes. The city setbacks rules dictated by the BBMP govern what you can build. We address these specific concerns.
          </p>

          <h2 className="font-serif text-2xl font-bold text-primary mt-12 pb-2 border-b border-border-custom">
            Our Core Editorial Pillars
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8 not-prose">
            <div className="p-6 border border-border-custom bg-card">
              <Award className="h-6 w-6 text-accent mb-4" />
              <h3 className="font-serif text-lg font-bold text-primary mb-2">Technical Honesty</h3>
              <p className="text-secondary text-xs leading-relaxed">
                We break down complex civil terms (like concrete mix grades M20/M25 and steel tensile strength Fe 550D) so you can audit material quality at your site.
              </p>
            </div>
            <div className="p-6 border border-border-custom bg-card">
              <Compass className="h-6 w-6 text-accent mb-4" />
              <h3 className="font-serif text-lg font-bold text-primary mb-2">Modern Vastu Integration</h3>
              <p className="text-secondary text-xs leading-relaxed">
                We respect traditional architectural wisdom, blending cardinal direction placements (such as the Ishanya corner sump) with contemporary layouts.
              </p>
            </div>
            <div className="p-6 border border-border-custom bg-card">
              <ShieldCheck className="h-6 w-6 text-accent mb-4" />
              <h3 className="font-serif text-lg font-bold text-primary mb-2">Budgeting Transparency</h3>
              <p className="text-secondary text-xs leading-relaxed">
                No low-ball quotes. We provide genuine sq ft rates and warn homeowners about hidden costs, permits, and excavation charges.
              </p>
            </div>
            <div className="p-6 border border-border-custom bg-card">
              <MapPin className="h-6 w-6 text-accent mb-4" />
              <h3 className="font-serif text-lg font-bold text-primary mb-2">Bangalore Geocentered</h3>
              <p className="text-secondary text-xs leading-relaxed">
                All guides, waterproofing solutions, and vendor sourcing tips are optimized for Bangalore coordinates, climates, and regulations.
              </p>
            </div>
          </div>

          <h2 className="font-serif text-2xl font-bold text-primary mt-12 pb-2 border-b border-border-custom">
            Meet the Editorial Team
          </h2>
          <p>
            Our articles are compiled by the senior engineering leads, design architects, and waterproofing managers at GK Home Construction. With a combined experience of over 15 years in constructing independent residential houses, duplex villas, and premium commercial remodels in Bangalore, our goal is to eliminate construction shortcuts and poor material choices.
          </p>

          {/* Contact Details */}
          <div className="border border-border-custom bg-card p-6 my-12 not-prose">
            <h3 className="font-serif text-lg font-bold text-primary mb-4 border-b border-border-custom/50 pb-2">
              Corporate Office & Consultation
            </h3>
            <div className="space-y-3 text-sm font-sans text-secondary">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent shrink-0" />
                GK Home Construction Office, Bangalore, Karnataka, India
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent shrink-0" />
                editorial@gkhomeconstruction.com
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent shrink-0" />
                +91 (Consultation Hotlines)
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <CTA buttonText="Consult GK Construction Team" />
      </div>
    </div>
  );
}
