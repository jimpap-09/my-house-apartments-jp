import { useReveal } from "@/hooks/use-reveal";
import { useI18n } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

export function Amenities() {
  const { t } = useI18n();
  const head = useReveal<HTMLDivElement>();

  return (
    <section id="amenities" className="section bg-muted/40">
      <div className="container-luxe">
        <div ref={head.ref} className={cn("reveal text-center max-w-2xl mx-auto", head.visible && "is-visible")}>
          <span className="eyebrow">{t.amenities.eyebrow}</span>
          <h2 className="heading-section mt-3">{t.amenities.title}</h2>
        </div>

        <div className="mt-14 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {t.amenities.items.map((it, i) => (
            <Item key={it.label} icon={it.icon} label={it.label} delay={0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Item({ icon, label, delay }: { icon: string; label: string; delay: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(
        "reveal flex items-center gap-4 bg-card rounded-xl p-5 border border-border/60 shadow-soft hover:border-accent/40 transition-all duration-500",
        visible && "is-visible",
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <span className="text-2xl">{icon}</span>
      <span className="font-medium text-foreground">{label}</span>
    </div>
  );
}
