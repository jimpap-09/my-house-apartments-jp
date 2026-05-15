import { useI18n } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function Header() {
  const { t, locale, setLocale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#why", label: t.nav.why },
    { href: "#about", label: t.nav.about },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#amenities", label: t.nav.amenities },
    { href: "#reviews", label: t.nav.reviews },
    { href: "#location", label: t.nav.location },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/60 transition-all duration-500",
        scrolled
          ? "py-3 shadow-soft"
          : "py-5",
      )}
    >
      <div className="container-luxe flex items-center justify-between gap-4">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-serif text-xl tracking-tight text-foreground transition-colors">
            My House Apartment JP
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center overflow-hidden rounded-full border border-border text-xs font-medium sm:flex">
            <button
              onClick={() => setLocale("el")}
              className={cn(
                "px-3 py-1.5 transition-colors",
                locale === "el"
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground hover:bg-muted",
              )}
            >
              EL
            </button>
            <button
              onClick={() => setLocale("en")}
              className={cn(
                "px-3 py-1.5 transition-colors",
                locale === "en"
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground hover:bg-muted",
              )}
            >
              EN
            </button>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-foreground transition-colors hover:bg-muted md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-background border-t border-border animate-fade-in">
          <div className="container-luxe py-5 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="flex items-center gap-2 px-4 py-3">
              <button
                onClick={() => {
                  setLocale("el");
                  setOpen(false);
                }}
                className={cn(
                  "flex-1 py-2 text-xs font-medium rounded-lg transition-colors",
                  locale === "el" ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-muted",
                )}
              >
                EL
              </button>
              <button
                onClick={() => {
                  setLocale("en");
                  setOpen(false);
                }}
                className={cn(
                  "flex-1 py-2 text-xs font-medium rounded-lg transition-colors",
                  locale === "en" ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-muted",
                )}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
