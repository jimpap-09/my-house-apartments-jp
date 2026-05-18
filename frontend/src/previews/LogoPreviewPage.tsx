const logos = [
  {
    name: 'Diamond mark',
    src: '/logos/logo-jp-diamond-mark.svg',
  },
  {
    name: 'Diamond lockup',
    src: '/logos/logo-jp-diamond-lockup.svg',
  },
  {
    name: 'Open P 01',
    src: '/logos/logo-jp-open-p-01.svg',
  },
]

export function LogoPreviewPage() {
  return (
    <section className="logo-preview-page">
      <div>
        <p className="eyebrow">Logo concepts</p>
        <h1>JP House Apartments</h1>
      </div>

      <div className="logo-preview-grid">
        {logos.map((logo) => (
          <article className="logo-preview-card" key={logo.name}>
            <img src={logo.src} alt={logo.name} />
            <h2>{logo.name}</h2>
          </article>
        ))}
      </div>
    </section>
  )
}
