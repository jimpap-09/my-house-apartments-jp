import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/LanguageContext";
import { ArrowDown, MapPin, Star } from "lucide-react";

const IMAGES = {
  hero: "/apartments/jp1/jp1-ss1.webp", // assuming this image
};

export function Hero() {
  const { t } = useI18n();

  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden flex items-center"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.hero}
          alt="Interior of My House Apartment JP in Ampelokipoi, Athens"
          className="h-full w-full object-cover animate-ken-burns"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="absolute inset-0 bg-charcoal/30" />
      </div>

      {/* Content */}
      <div className="container-luxe relative z-10 text-primary-foreground py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-charcoal/30 backdrop-blur-sm px-4 py-1.5 text-xs uppercase tracking-[0.22em] animate-fade-in">
            <MapPin size={14} className="text-accent" />
            {t.hero.locationChip}
          </div>

          <h1 className="heading-display mt-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {t.hero.title}
          </h1>

          <p className="mt-4 font-serif text-2xl sm:text-3xl text-primary-foreground/90 italic font-light animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {t.hero.tagline}
          </p>

          <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-primary-foreground/80 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {t.hero.intro}
          </p>

          <div className="mt-8 flex items-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-accent text-accent" />
              ))}
              <span className="text-sm font-medium">{t.hero.rating}</span>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 h-12 shadow-brass">
              <a href="#booking">{t.hero.bookNow}</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12 bg-transparent text-primary-foreground border-primary-foreground/40 hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <a href="#about">{t.hero.learnMore}</a>
            </Button>
          </div>
        </div>
      </div>

      <a
        href="#trust"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors animate-fade-in-slow"
        style={{ animationDelay: "0.8s" }}
        aria-label="Scroll down"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">{t.hero.scroll}</span>
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
}
