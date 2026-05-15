import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/LanguageContext";
import { buildWhatsAppUrl, telHref } from "@/lib/contact";
import { MessageCircle, Phone } from "lucide-react";

export function CTABand() {
  const { t } = useI18n();
  const wa = buildWhatsAppUrl(`Hello! I'd like to book My House Apartment JP.`);

  return (
    <section className="bg-charcoal text-primary-foreground py-20">
      <div className="container-luxe text-center max-w-2xl">
        <h2 className="heading-section">{t.ctaBand.title}</h2>
        <p className="mt-4 text-primary-foreground/75">{t.ctaBand.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 h-12 shadow-brass">
            <a href={wa} target="_blank" rel="noopener noreferrer">
              <MessageCircle /> {t.ctaBand.whatsapp}
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12 bg-transparent text-primary-foreground border-primary-foreground/40 hover:bg-primary-foreground/10 hover:text-primary-foreground">
            <a href={telHref}>
              <Phone /> {t.ctaBand.call}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
