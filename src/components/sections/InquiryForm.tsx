import { Button } from "@/components/ui/button";
import { useReveal } from "@/hooks/use-reveal";
import { useI18n } from "@/i18n/LanguageContext";
import { buildWhatsAppUrl, CONTACT, telHref } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { MessageCircle, Phone } from "lucide-react";

export function InquiryForm() {
  const { t } = useI18n();
  const reveal = useReveal<HTMLDivElement>();
  const wa = buildWhatsAppUrl("Hello! I would like to ask about availability for My House Apartment JP.");

  return (
    <section id="booking" className="section bg-gradient-warm">
      <div className="container-luxe">
        <div
          ref={reveal.ref}
          className={cn("reveal mx-auto max-w-2xl text-center", reveal.visible && "is-visible")}
        >
          <span className="eyebrow">{t.inquiry.eyebrow}</span>
          <h2 className="heading-section mt-3">{t.inquiry.title}</h2>
          <p className="mt-4 text-muted-foreground">{t.inquiry.body}</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-6 rounded-2xl border border-border/60 bg-card p-6 shadow-soft sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="text-xs font-medium uppercase tracking-widest text-accent">{t.footer.phone}</div>
            <a href={telHref} className="mt-3 block font-serif text-3xl text-foreground transition-colors hover:text-accent">
              {CONTACT.phoneDisplay}
            </a>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{t.inquiry.phone}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button asChild size="lg" className="h-12 rounded-full bg-accent px-8 text-accent-foreground hover:bg-accent/90">
              <a href={telHref}>
                <Phone /> {t.ctaBand.call}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 rounded-full px-8">
              <a href={wa} target="_blank" rel="noopener noreferrer">
                <MessageCircle /> {t.ctaBand.whatsapp}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
