import { useReveal } from "@/hooks/use-reveal";
import { useI18n } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const IMAGES = {
  about: "/apartments/jp1/jp1-ss2.webp", // assuming
};

export function About() {
  const { t } = useI18n();
  const left = useReveal<HTMLDivElement>();
  const right = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="section bg-muted/40">
      <div className="container-luxe grid gap-14 lg:grid-cols-2 lg:items-center">
        <div ref={left.ref} className={cn("reveal relative", left.visible && "is-visible")}>
          <div className="relative overflow-hidden rounded-2xl shadow-elegant aspect-[4/5]">
            <img
              src={IMAGES.about}
              alt="Living space at My House Apartment JP"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-card rounded-2xl shadow-elegant p-5 sm:p-6 border border-border/60 flex gap-6">
            <Stat value="9.5" label={t.about.statRating} />
            <div className="w-px bg-border" />
            <Stat value="99+" label={t.about.statGuests} />
          </div>
        </div>

        <div ref={right.ref} className={cn("reveal", right.visible && "is-visible")}>
          <span className="eyebrow">{t.about.eyebrow}</span>
          <h2 className="heading-section mt-3">{t.about.title}</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{t.about.body}</p>

          <ul className="mt-8 space-y-4">
            {t.about.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Check size={14} />
                </span>
                <span className="text-foreground/85">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center min-w-[80px]">
      <div className="font-serif text-3xl text-accent">{value}</div>
      <div className="text-[0.7rem] uppercase tracking-widest text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
