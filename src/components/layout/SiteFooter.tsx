import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n/LanguageContext'

export function SiteFooter() {
  const { t } = useI18n()

  return (
    <footer className="site-footer">
      <div className="site-footer-top">
        <div className="site-footer-brand">
          <strong>My House Apartments JP</strong>
          <p>{t.app.footerLocation}</p>
        </div>
      </div>

      <div className="site-footer-main">
        <div className="site-footer-column">
          <h2>My House</h2>
          <a href="#about">{t.app.about}</a>
          <Link to="/">{t.app.apartments}</Link>
        </div>

        <div className="site-footer-column">
          <h2>{t.app.contact}</h2>
          <a href="mailto:johnpap26@gmail.com">johnpap26@gmail.com</a>
          <a href="tel:+306983505842">698 350 5842</a>
        </div>

        <div className="site-footer-column">
          <h2>{t.app.location}</h2>
          <span>{t.app.footerLocation}</span>
        </div>
      </div>

      <div className="site-footer-bottom">
        <small>© {new Date().getFullYear()} My House Apartments JP</small>
      </div>
    </footer>
  )
}
