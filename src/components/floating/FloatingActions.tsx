import { useI18n } from "@/i18n/LanguageContext";
import { buildWhatsAppUrl, telHref } from "@/lib/contact";
import { MessageCircle, Phone } from "lucide-react";

export function FloatingActions() {
  const { t } = useI18n();
  const wa = buildWhatsAppUrl(`Hello! I'd like to book My House Apartment JP.`);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
        aria-label={t.floating.whatsapp}
      >
        <MessageCircle size={24} />
      </a>
      <a
        href={telHref}
        className="flex items-center justify-center w-14 h-14 bg-accent text-accent-foreground rounded-full shadow-lg hover:bg-accent/90 transition-colors"
        aria-label={t.floating.call}
      >
        <Phone size={24} />
      </a>
    </div>
  );
}
