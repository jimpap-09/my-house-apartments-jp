import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useI18n } from '../i18n/LanguageContext'

export function PageLayout() {
  const { language, setLanguage, t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="site-shell">
      <header className={`site-header lovable-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="lovable-header-inner">
          <Link className="brand" to="/">
            <img src="/logos/logo-jp-diamond-lockup.svg" alt="My House Apartments" />
          </Link>

          <nav className="site-nav desktop-nav" aria-label="Main navigation">
            <Link to="/">{t.app.apartments}</Link>
            <a href="mailto:hello@myhouseapartments.example">{t.app.contact}</a>
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

            <button
              className="mobile-menu-trigger"
              type="button"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mobile-nav">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              {t.app.apartments}
            </Link>
            <a href="mailto:hello@myhouseapartments.example" onClick={() => setIsMenuOpen(false)}>
              {t.app.contact}
            </a>
          </div>
        )}
      </header>

      <main className="page-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <span>My House Apartments JP</span>
        <span>{t.app.footerLocation}</span>
      </footer>
    </div>
  )
}
