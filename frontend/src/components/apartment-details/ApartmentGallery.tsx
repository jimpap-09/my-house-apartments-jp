
type ApartmentGalleryProps = {
  photos: string[]
  previewPhotos: { index: number; src: string }[]
  onOpenPhoto: (index: number) => void
}

export function ApartmentGallery({
  photos,
  previewPhotos,
  onOpenPhoto,
}: ApartmentGalleryProps) {
  return (
    <section className="grid gap-6" id="gallery">
      <div className="grid gap-3 text-center">
        <p className="eyebrow mx-auto">gallery</p>
        <h2 className="text-3xl font-serif text-charcoal">exploreApartment</h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-[2fr_1fr_1fr]">
        {previewPhotos.map((photo, previewIndex) => (
          <button
            className={`relative overflow-hidden rounded-[28px] border border-border bg-slate-100 p-0 text-left transition duration-200 hover:-translate-y-0.5 ${previewIndex === 0 ? 'sm:row-span-2' : ''
              }`}
            type="button"
            onClick={() => onOpenPhoto(photo.index)}
            key={photo.src}
          >
            <img
              src={photo.src}
              alt="Apartment preview"
              className="h-full w-full object-cover transition duration-500 hover:scale-105"
            />
          </button>
        ))}

        {photos.length > 0 && (
          <button
            className="rounded-[28px] border border-border bg-white px-5 py-4 text-left text-sm font-semibold text-charcoal transition hover:border-primary/40 hover:bg-primary/5"
            type="button"
            onClick={() => onOpenPhoto(0)}
          >
            Show All Photos
          </button>
        )}
      </div>
    </section>
  )
}

