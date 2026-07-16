export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-top">
        <div className="site-footer-brand">
          <strong>My House Apartments JP</strong>
          <p>Ampelokoipoi, Athens, Greece</p>
        </div>
      </div>

      <div className="site-footer-main">
        <div className="site-footer-column">
          <h2>Contact</h2>
          <span>johnpap26@gmail.com</span>
          <span>698 350 5842</span>
        </div>

        <div className="site-footer-column">
          <h2>Location</h2>
          <span>Ampelokoipoi, Athens, Greece</span>
        </div>
      </div>

      <div className="site-footer-bottom">
        <small>© {new Date().getFullYear()} My House Apartments JP</small>
      </div>
    </footer>
  )
}
