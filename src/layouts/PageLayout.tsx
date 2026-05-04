import { useEffect, useRef, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useI18n } from '../i18n'

export function PageLayout() {
  const { language, setLanguage, t } = useI18n()
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const settingsMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closeSettingsMenu = (event: MouseEvent) => {
      if (!settingsMenuRef.current?.contains(event.target as Node)) {
        setIsSettingsOpen(false)
      }
    }

    document.addEventListener('mousedown', closeSettingsMenu)
    return () => document.removeEventListener('mousedown', closeSettingsMenu)
  }, [])

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" to="/">
          {t('brand')}
        </Link>
        <div className="header-center">
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
        <div className="settings-menu" ref={settingsMenuRef}>
          <button
            className="settings-trigger"
            type="button"
            aria-label={t('settings')}
            aria-expanded={isSettingsOpen}
            onClick={() => setIsSettingsOpen((isOpen) => !isOpen)}
          >
            <span className="hamburger-icon" aria-hidden="true"></span>
          </button>
          {isSettingsOpen && (
            <div className="settings-dropdown">
              <button type="button">{t('account')}</button>
              <button type="button">{t('reservations')}</button>
              <button type="button">{t('adminPanel')}</button>
            </div>
          )}
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
