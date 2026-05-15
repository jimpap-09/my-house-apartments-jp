import { useReveal } from "@/hooks/use-reveal";
import { useI18n } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const IMAGES = Array.from({ length: 16 }, (_, i) => `/apartments/jp1/jp1-ss${i + 1}.webp`);
const PREVIEW_INDEXES = [0, 10, 2, 3, 8];

export function Gallery() {
  const { t } = useI18n();
  const [active, setActive] = useState<number | null>(null);
  const head = useReveal<HTMLDivElement>();
  const previewImages = useMemo(() => PREVIEW_INDEXES.map((index) => ({ index, src: IMAGES[index] })), []);

  useEffect(() => {
    if (active === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((current) => current === null ? current : (current + 1) % IMAGES.length);
      if (event.key === "ArrowLeft") setActive((current) => current === null ? current : (current - 1 + IMAGES.length) % IMAGES.length);
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [active]);

  const previous = () => setActive((current) => current === null ? current : (current - 1 + IMAGES.length) % IMAGES.length);
  const next = () => setActive((current) => current === null ? current : (current + 1) % IMAGES.length);

  return (
    <section id="gallery" className="section bg-background">
      <div className="container-luxe">
        <div ref={head.ref} className={cn("reveal mx-auto max-w-2xl text-center", head.visible && "is-visible")}>
          <span className="eyebrow">{t.gallery.eyebrow}</span>
          <h2 className="heading-section mt-3">{t.gallery.title}</h2>
          <p className="mt-4 text-muted-foreground">{t.gallery.note}</p>
        </div>

        <div className="relative mt-14 grid grid-cols-2 grid-rows-[240px_160px_160px] gap-2 overflow-hidden rounded-xl md:grid-cols-[2fr_1fr_1fr] md:grid-rows-[220px_220px]">
          {previewImages.map(({ index, src }, previewIndex) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "group overflow-hidden bg-muted",
                previewIndex === 0 && "col-span-2 md:row-span-2",
              )}
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading={previewIndex === 0 ? "eager" : "lazy"}
              />
            </button>
          ))}

          <button
            type="button"
            onClick={() => setActive(0)}
            className="absolute bottom-4 right-4 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-elegant transition-colors hover:bg-muted"
          >
            {t.gallery.openAll}
          </button>
        </div>
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/90 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={t.gallery.title}
        >
          <div className="mx-auto grid h-full max-w-7xl grid-rows-[auto_minmax(0,1fr)_auto] gap-4">
            <div className="flex items-center justify-between text-primary-foreground">
              <div className="text-sm font-medium">
                {active + 1} / {IMAGES.length}
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="rounded-full p-2 transition-colors hover:bg-primary-foreground/10"
                aria-label={t.gallery.close}
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid min-h-0 gap-4 lg:grid-cols-[minmax(0,1fr)_180px]">
              <div className="relative grid min-h-0 place-items-center overflow-hidden rounded-lg bg-black/30">
                <button
                  type="button"
                  onClick={previous}
                  className="absolute left-3 z-10 rounded-full bg-charcoal/60 p-2 text-primary-foreground transition-colors hover:bg-charcoal"
                  aria-label={t.gallery.previous}
                >
                  <ChevronLeft size={24} />
                </button>
                <img
                  src={IMAGES[active]}
                  alt=""
                  className="h-full w-full object-contain"
                />
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-3 z-10 rounded-full bg-charcoal/60 p-2 text-primary-foreground transition-colors hover:bg-charcoal"
                  aria-label={t.gallery.next}
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2 overflow-y-auto pr-1 lg:grid-cols-1 lg:auto-rows-[110px]">
                {IMAGES.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActive(index)}
                    className={cn(
                      "overflow-hidden rounded-md border-2",
                      index === active ? "border-accent" : "border-transparent",
                    )}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {IMAGES.map((src, index) => (
                <button
                  key={`mobile-${src}`}
                  type="button"
                  onClick={() => setActive(index)}
                  className={cn(
                    "h-16 w-24 flex-shrink-0 overflow-hidden rounded-md border-2",
                    index === active ? "border-accent" : "border-transparent",
                  )}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
