import { useI18n } from '@/i18n/LanguageContext'

export function SiteFooter() {
  const { t } = useI18n()

  return (
    <footer className="site-footer">
      <div className="site-footer-top">
        <div className="site-footer-brand">
          <strong>My House Apartments JP</strong>
          <p>{t.app.footerEyebrow}</p>
        </div>
      </div>

      <div className="site-footer-main">
        <div className="site-footer-column">
          <h2>{t.app.footerContact}</h2>
          <span>johnpap26@gmail.com</span>
          <span>698 350 5842</span>
        </div>

        <div className="site-footer-column">
          <h2>{t.app.footerLocation}</h2>
          <span>{t.app.footerLocationSpot}</span>
        </div>
      </div>

      <div className="site-footer-bottom">
        <small>© {new Date().getFullYear()} My House Apartments JP</small>
      </div>
    </footer>
  )
}
