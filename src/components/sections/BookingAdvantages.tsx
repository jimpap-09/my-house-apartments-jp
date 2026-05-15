import { useReveal } from "@/hooks/use-reveal";
import { useI18n } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

export function BookingAdvantages() {
  const { t } = useI18n();
  const head = useReveal<HTMLDivElement>();

  return (
    <section className="section bg-charcoal text-primary-foreground relative overflow-hidden grain">
      <div className="container-luxe relative">
        <div ref={head.ref} className={cn("reveal max-w-2xl", head.visible && "is-visible")}>
          <span className="eyebrow text-brass-soft">{t.advantages.eyebrow}</span>
          <h2 className="heading-section mt-3">{t.advantages.title}</h2>
        </div>

        <div className="mt-14 grid gap-px bg-primary-foreground/10 sm:grid-cols-2 rounded-2xl overflow-hidden">
          {t.advantages.items.map((it, i) => (
            <Item key={it.title} {...it} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Item({ title, body, delay }: { title: string; body: string; delay: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn("reveal bg-charcoal p-8 sm:p-10", visible && "is-visible")}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Sparkles size={20} className="text-accent" />
      <h3 className="font-serif text-2xl mt-4">{title}</h3>
      <p className="mt-3 text-primary-foreground/70 leading-relaxed">{body}</p>
    </div>
  );
}
