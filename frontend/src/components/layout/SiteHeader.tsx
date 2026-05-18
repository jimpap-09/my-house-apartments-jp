import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n/LanguageContext'

export function SiteHeader() {
  const { language, setLanguage, t } = useI18n()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header site-header-bar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="site-header-inner">
        <Link className="brand" to="/">
          <img src="/logos/logo-jp-diamond-lockup.svg" alt="My House Apartments" />
        </Link>

        <nav className="site-nav desktop-nav" aria-label="Main navigation">
          <Link to="/">{t.app.apartments}</Link>
          <a href="mailto:johnpap26@gmail.com">{t.app.contact}</a>
        </nav>

        <div className="header-actions">
          <div className="language-pills" aria-label={t.app.language}>
            <button
              type="button"
              className={language === 'el' ? 'active' : ''}
              onClick={() => setLanguage('el')}
            >
              EL
            </button>
            <button
              type="button"
              className={language === 'en' ? 'active' : ''}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
