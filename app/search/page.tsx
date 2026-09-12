"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink, MapPin, Phone, Search, Star } from "lucide-react";

interface ServiceBusiness {
  name: string;
  trade: string;
  category_detail: string;
  rating: number;
  reviews: number;
  phone: string;
  address: string;
  area: string;
  website: string;
}

export default function SearchPage() {
  const [businesses, setBusinesses] = useState<ServiceBusiness[]>([]);
  const [areaQuery, setAreaQuery] = useState("");
  const [selectedTrade, setSelectedTrade] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadBusinesses() {
      try {
        const dataPath = process.env.NODE_ENV === "production"
          ? "/homeconstruction.github.io/data.json"
          : "/data.json";
        const response = await fetch(dataPath);
        if (!response.ok) throw new Error("Unable to load service directory");

        const data = (await response.json()) as ServiceBusiness[];
        const uniqueAreaCount = new Set(
          data.map((business) => business.area.trim()).filter(Boolean)
        ).size;
        console.info("Service directory loaded", {
          totalRecords: data.length,
          uniqueAreas: uniqueAreaCount,
        });
        if (isMounted) setBusinesses(data);
      } catch {
        if (isMounted) setError("We could not load the service directory. Please try again.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadBusinesses();

    return () => {
      isMounted = false;
    };
  }, []);

  const trades = useMemo(
    () => Array.from(new Set(businesses.map((business) => business.trade))).sort(),
    [businesses]
  );

  const areas = useMemo(
    () =>
      Array.from(
        new Set(businesses.map((business) => business.area.trim()).filter(Boolean))
      ).sort((first, second) => first.localeCompare(second)),
    [businesses]
  );

  const filteredBusinesses = useMemo(() => {
    const normalizedArea = areaQuery.trim().toLowerCase();

    return businesses
      .filter((business) => {
        const matchesArea =
          !normalizedArea ||
          business.area.toLowerCase().includes(normalizedArea) ||
          business.address.toLowerCase().includes(normalizedArea);
        const matchesTrade = !selectedTrade || business.trade === selectedTrade;

        return matchesArea && matchesTrade;
      })
      .sort((first, second) => second.rating - first.rating);
  }, [areaQuery, businesses, selectedTrade]);

  return (
    <div className="pb-20">
      <section className="bg-card border-b border-border-custom">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="mb-4 inline-block border border-accent/25 bg-accent/5 px-3 py-1 text-[10px] font-sans font-bold uppercase tracking-widest text-accent">
              Bangalore service directory
            </span>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-primary sm:text-5xl">
              Find the right service for your home
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-secondary sm:text-base">
              Search local professionals by area, locality, or the work you need done.
            </p>
          </div>

          <div className="mt-10 grid gap-4 border border-border-custom bg-bg p-4 md:grid-cols-[1fr_280px] md:p-5">
            <label className="block">
              <span className="mb-2 block text-xs font-sans font-bold uppercase tracking-wider text-primary">
                Area / Locality
              </span>
              <span className="relative block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary" />
                <input
                  type="search"
                  list="service-areas"
                  value={areaQuery}
                  onChange={(event) => setAreaQuery(event.target.value)}
                  placeholder="Try Jayanagar or Nagarbhavi"
                  className="w-full border border-border-custom bg-card px-10 py-3 text-sm font-sans text-primary outline-none transition-colors placeholder:text-secondary/70 focus:border-accent"
                />
                <datalist id="service-areas">
                  {areas.map((area) => (
                    <option key={area} value={area} />
                  ))}
                </datalist>
              </span>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-sans font-bold uppercase tracking-wider text-primary">
                Service
              </span>
              <select
                value={selectedTrade}
                onChange={(event) => setSelectedTrade(event.target.value)}
                className="w-full border border-border-custom bg-card px-3 py-3 text-sm font-sans capitalize text-primary outline-none transition-colors focus:border-accent"
              >
                <option value="">All services</option>
                {trades.map((trade) => (
                  <option key={trade} value={trade}>
                    {trade}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-2 border-b border-border-custom pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-primary">Local professionals</h2>
            <p className="mt-1 text-xs font-sans uppercase tracking-wider text-secondary">
              {isLoading ? "Loading directory..." : `${filteredBusinesses.length} results`}
            </p>
          </div>
          {!isLoading && !error && (
            <p className="text-xs font-sans text-secondary">Sorted by rating</p>
          )}
        </div>

        {error ? (
          <p className="border border-border-custom bg-card p-8 text-center text-sm text-secondary">
            {error}
          </p>
        ) : isLoading ? (
          <p className="border border-border-custom bg-card p-8 text-center text-sm text-secondary">
            Loading local businesses...
          </p>
        ) : filteredBusinesses.length === 0 ? (
          <p className="border border-border-custom bg-card p-8 text-center text-sm text-secondary">
            No businesses match those filters. Try a nearby locality or another service.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBusinesses.map((business, index) => (
              <article
                key={`${business.name}-${business.area}-${index}`}
                className="flex h-full flex-col border border-border-custom bg-card p-6 transition-shadow duration-300 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-xl font-bold leading-snug text-primary">
                    {business.name}
                  </h3>
                  <span className="shrink-0 border border-accent/25 bg-accent/5 px-2 py-1 text-[10px] font-sans font-bold uppercase tracking-wider text-accent">
                    {business.trade}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm font-sans text-primary">
                  <Star className="h-4 w-4 fill-gold text-gold" />
                  <span className="font-semibold">{business.rating.toFixed(1)}</span>
                  <span className="text-secondary">({business.reviews} reviews)</span>
                </div>

                <div className="mt-5 flex flex-1 flex-col gap-3 text-sm font-sans text-secondary">
                  {business.address && (
                    <p className="flex items-start gap-2 leading-relaxed">
                      <MapPin className="mt-1 h-4 w-4 shrink-0 text-accent" />
                      <span>{business.address}</span>
                    </p>
                  )}
                  {business.phone && (
                    <a
                      href={`tel:${business.phone}`}
                      className="flex items-center gap-2 text-accent transition-colors hover:text-gold"
                    >
                      <Phone className="h-4 w-4 shrink-0" />
                      {business.phone}
                    </a>
                  )}
                </div>

                {business.website && (
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 border-t border-border-custom pt-4 text-xs font-sans font-bold uppercase tracking-wider text-accent transition-colors hover:text-gold"
                  >
                    Visit website
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}