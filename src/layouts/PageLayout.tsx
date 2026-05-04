import { Link, Outlet } from 'react-router-dom'
import { useI18n } from '../i18n'

export function PageLayout() {
  const { language, setLanguage, t } = useI18n()

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" to="/">
          {t('brand')}
        </Link>
        <div className="header-actions">
          <nav className="site-nav" aria-label="Main navigation">
            <Link to="/">{t('apartments')}</Link>
            <a href="mailto:hello@myhouseapartments.example">{t('contact')}</a>
          </nav>
          <label className="language-switcher" aria-label={t('language')}>
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value as typeof language)}
            >
              <option value="en">EN</option>
              <option value="el">EL</option>
            </select>
          </label>
        </div>
      </header>

      <main className="page-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <span>My House Apartments JP</span>
        <span>{t('footerLocation')}</span>
      </footer>
    </div>
  )
}
