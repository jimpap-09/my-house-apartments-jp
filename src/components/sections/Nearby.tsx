import { useReveal } from "@/hooks/use-reveal";
import { useI18n } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

export function Nearby() {
  const { t } = useI18n();
  const head = useReveal<HTMLDivElement>();

  return (
    <section className="section bg-background">
      <div className="container-luxe">
        <div ref={head.ref} className={cn("reveal text-center max-w-2xl mx-auto", head.visible && "is-visible")}>
          <span className="eyebrow">{t.nearby.eyebrow}</span>
          <h2 className="heading-section mt-3">{t.nearby.title}</h2>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.nearby.items.map((it, i) => (
            <Item key={it.name} name={it.name} meta={it.meta} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Item({ name, meta, delay }: { name: string; meta: string; delay: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(
        "reveal group flex items-center justify-between bg-card border border-border/60 rounded-xl px-5 py-4 hover:border-accent/40 hover:-translate-y-0.5 transition-all duration-500",
        visible && "is-visible",
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="font-medium">{name}</span>
      <span className="text-xs uppercase tracking-widest text-accent">{meta}</span>
    </div>
  );
}
