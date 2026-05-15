import { useReveal } from "@/hooks/use-reveal";
import { useI18n } from "@/i18n/LanguageContext";
import { CONTACT } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { ExternalLink, MapPin } from "lucide-react";

export function Location() {
  const { t } = useI18n();
  const left = useReveal<HTMLDivElement>();
  const right = useReveal<HTMLDivElement>();

  return (
    <section id="location" className="section bg-muted/40">
      <div className="container-luxe grid gap-12 lg:grid-cols-2 lg:items-center">
        <div ref={left.ref} className={cn("reveal", left.visible && "is-visible")}>
          <span className="eyebrow">{t.location.eyebrow}</span>
          <h2 className="heading-section mt-3">{t.location.title}</h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{t.location.body}</p>

          <ul className="mt-8 space-y-3">
            {t.location.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-foreground/85">
                <MapPin size={18} className="mt-0.5 text-accent flex-shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-xl bg-card border border-border/60 p-5 shadow-soft">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{t.location.eyebrow}</div>
            <div className="mt-1 font-medium">{CONTACT.address}</div>
            <a
              href={CONTACT.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-accent hover:underline"
            >
              {t.location.openMap} <ExternalLink size={14} />
            </a>
          </div>
        </div>

        <div
          ref={right.ref}
          className={cn(
            "reveal relative aspect-[4/3] rounded-2xl overflow-hidden shadow-elegant border border-border/60",
            right.visible && "is-visible",
          )}
        >
          <iframe
            title="Map"
            src={CONTACT.mapsEmbed}
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
