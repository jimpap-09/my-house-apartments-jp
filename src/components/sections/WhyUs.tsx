import { useReveal } from "@/hooks/use-reveal";
import { useI18n } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

export function WhyUs() {
  const { t } = useI18n();
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="why" className="section bg-background">
      <div className="container-luxe">
        <div ref={ref} className={cn("reveal text-center max-w-2xl mx-auto", visible && "is-visible")}>
          <span className="eyebrow">{t.why.eyebrow}</span>
          <h2 className="heading-section mt-3">{t.why.title}</h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {t.why.items.map((item, i) => (
            <Card key={item.title} {...item} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ icon, title, body, delay }: { icon: string; title: string; body: string; delay: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn(
        "reveal group relative bg-card rounded-2xl p-8 border border-border/60 shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-1",
        visible && "is-visible",
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-4xl">{icon}</div>
      <h3 className="font-serif text-2xl mt-5">{title}</h3>
      <p className="mt-3 text-muted-foreground leading-relaxed">{body}</p>
      <div className="mt-6 h-px w-10 bg-accent/60 group-hover:w-20 transition-all duration-500" />
    </div>
  );
}
