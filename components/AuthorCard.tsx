import { Award, ShieldCheck, MapPin } from "lucide-react";

interface AuthorCardProps {
  author?: string;
  date?: string;
  updated?: string;
}

export default function AuthorCard({
  author = "GK Home Construction Editorial",
  date,
  updated,
}: AuthorCardProps) {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const formattedUpdate = updated
    ? new Date(updated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 border border-border-custom bg-card my-12">
      {/* Editorial Profile Icon */}
      <div className="flex-shrink-0 w-16 h-16 bg-accent/5 border border-accent/25 rounded-full flex items-center justify-center text-accent font-serif text-xl font-bold">
        GK
      </div>

      {/* Profile Bio */}
      <div className="flex-1 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 justify-center sm:justify-start">
          <h4 className="font-serif text-lg font-bold text-primary">{author}</h4>
          <span className="inline-flex items-center gap-1 self-center bg-gold/10 text-accent text-[10px] font-sans font-bold px-2.5 py-0.5 rounded border border-gold/20">
            <ShieldCheck className="h-3 w-3" />
            Verified Expert
          </span>
        </div>

        <p className="text-secondary text-sm font-sans leading-relaxed mb-4">
          Educational homebuilding, Vastu architecture, and interior design content curated by the core engineering and design team at GK Home Construction. Empowering Bangalore homeowners with structural checklists, cost estimators, and material selection tips since 2018.
        </p>

        {/* E-E-A-T Meta Flags */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2 text-xs text-secondary font-sans border-t border-border-custom/50 pt-4">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-accent" />
            Bangalore, India
          </span>
          {formattedDate && (
            <span className="flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-accent" />
              Published: {formattedDate}
            </span>
          )}
          {formattedUpdate && formattedUpdate !== formattedDate && (
            <span className="text-accent font-medium">
              Updated: {formattedUpdate}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
