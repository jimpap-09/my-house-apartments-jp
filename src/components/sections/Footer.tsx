import { useI18n } from "@/i18n/LanguageContext";
import { CONTACT, telHref } from "@/lib/contact";
import { Clock, MapPin, Phone } from "lucide-react";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  const navLinks = [
    { href: "#why", label: t.nav.why },
    { href: "#about", label: t.nav.about },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#amenities", label: t.nav.amenities },
    { href: "#reviews", label: t.nav.reviews },
    { href: "#location", label: t.nav.location },
    { href: "#booking", label: t.nav.book },
  ];

  return (
    <footer className="bg-charcoal text-primary-foreground">
      <div className="container-luxe grid gap-12 py-16 md:grid-cols-[1.15fr_0.85fr_0.85fr] lg:gap-16">
        <div>
          <div className="font-serif text-3xl">My House Apartment JP</div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/75">{t.footer.tagline}</p>

          <a
            href="#booking"
            className="mt-7 inline-flex h-11 items-center rounded-full bg-accent px-6 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
          >
            {t.nav.book}
          </a>
        </div>

        <div>
          <FooterHeading>{t.nav.about}</FooterHeading>
          <nav className="mt-5 grid gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="w-fit text-sm text-primary-foreground/80 transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <FooterHeading>{t.footer.phone}</FooterHeading>
          <div className="mt-5 grid gap-5">
            <FootItem icon={<Phone size={16} />} label={t.footer.phone}>
              <a href={telHref} className="transition-colors hover:text-accent">
                {CONTACT.phoneDisplay}
              </a>
            </FootItem>
            <FootItem icon={<MapPin size={16} />} label={t.footer.address}>
              {CONTACT.address}
            </FootItem>
            <FootItem icon={<Clock size={16} />} label={t.footer.hours}>
              {t.footer.hoursValue}
            </FootItem>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container-luxe flex flex-col gap-3 py-6 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <div>© {year} My House Apartment JP. {t.footer.rights}</div>
          <div>{CONTACT.addressShort}</div>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-medium uppercase tracking-widest text-primary-foreground/50">
      {children}
    </div>
  );
}

function FootItem({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-accent">
        {icon} {label}
      </div>
      <div className="mt-2 text-sm leading-relaxed text-primary-foreground/80">{children}</div>
    </div>
  );
}
