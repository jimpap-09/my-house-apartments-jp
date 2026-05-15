import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/LanguageContext";

export function NotFoundPage() {
  const { locale } = useI18n();
  const text = locale === "el"
    ? {
        title: "Η σελίδα δεν βρέθηκε",
        body: "Η σελίδα που άνοιξες δεν υπάρχει.",
        back: "Πίσω στην αρχική",
      }
    : {
        title: "Page not found",
        body: "The page you opened does not exist.",
        back: "Back home",
      };

  return (
    <section className="min-h-screen bg-background px-6 py-24 text-center">
      <h1 className="text-4xl font-semibold text-foreground">{text.title}</h1>
      <p className="mt-4 text-muted-foreground">{text.body}</p>
      <Link className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-primary-foreground" to="/">
        {text.back}
      </Link>
    </section>
  );
}

export default NotFoundPage;
