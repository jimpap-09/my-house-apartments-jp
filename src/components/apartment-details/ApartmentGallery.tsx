import type { Dictionary } from '@/i18n/dictionaries'

type ApartmentGalleryProps = {
  photos: string[]
  previewPhotos: { index: number; src: string }[]
  labels: Dictionary['app']
  onOpenPhoto: (index: number) => void
}

export function ApartmentGallery({
  photos,
  previewPhotos,
  labels,
  onOpenPhoto,
}: ApartmentGalleryProps) {
  return (
    <section className="apartment-section apartment-gallery-section" id="gallery">
      <div className="apartment-section-heading">
        <p className="eyebrow">{labels.gallery}</p>
        <h2>{labels.exploreApartment}</h2>
      </div>
      <div className="apartment-gallery-grid">
        {previewPhotos.map((photo, previewIndex) => (
          <button
            className={previewIndex === 0 ? 'featured' : ''}
            type="button"
            onClick={() => onOpenPhoto(photo.index)}
            key={photo.src}
          >
            <img src={photo.src} alt="" />
          </button>
        ))}
        {photos.length > 0 && (
          <button className="apartment-gallery-open" type="button" onClick={() => onOpenPhoto(0)}>
            {labels.showAllPhotos}
          </button>
        )}
      </div>
    </section>
  )
}
