import { useReveal } from "@/hooks/use-reveal";
import { useI18n } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export function Reviews() {
  const { t } = useI18n();
  const head = useReveal<HTMLDivElement>();

  return (
    <section id="reviews" className="section bg-background">
      <div className="container-luxe">
        <div ref={head.ref} className={cn("reveal text-center max-w-2xl mx-auto", head.visible && "is-visible")}>
          <span className="eyebrow">{t.reviews.eyebrow}</span>
          <h2 className="heading-section mt-3">{t.reviews.title}</h2>

          <div className="mt-8 inline-flex items-center gap-4 rounded-full bg-card border border-border/60 px-6 py-3 shadow-soft">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-accent text-accent" />
              ))}
            </div>
            <span className="text-sm font-medium">9.5</span>
            <span className="text-xs text-muted-foreground">({t.reviews.googleLabel})</span>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {t.reviews.items.map((r, i) => (
            <ReviewCard key={r.name} {...r} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ name, when, text, delay }: { name: string; when: string; text: string; delay: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const initial = name.trim().charAt(0);
  return (
    <div
      ref={ref}
      className={cn(
        "reveal relative bg-card rounded-2xl p-7 border border-border/60 shadow-soft hover:shadow-elegant transition-all duration-500",
        visible && "is-visible",
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="absolute top-5 right-5 font-serif text-5xl text-accent/25 leading-none select-none">"</span>
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} className="fill-accent text-accent" />
        ))}
      </div>
      <p className="text-foreground/85 leading-relaxed">{text}</p>
      <div className="mt-6 flex items-center gap-3 pt-5 border-t border-border/60">
        <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center font-serif text-lg text-accent">
          {initial}
        </div>
        <div>
          <div className="font-medium text-foreground">{name}</div>
          <div className="text-xs text-muted-foreground">{when}</div>
        </div>
      </div>
    </div>
  );
}
