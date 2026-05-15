import { useI18n } from "@/i18n/LanguageContext";

export function TrustStrip() {
  const { t } = useI18n();
  const items = [...t.trust, ...t.trust]; // duplicate for seamless marquee

  return (
    <section id="trust" className="bg-charcoal text-primary-foreground py-4 overflow-hidden border-y border-charcoal">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-3 px-8 text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-primary-foreground/85 tracking-wide">{it}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
