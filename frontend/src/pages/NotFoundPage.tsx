import { Link } from 'react-router-dom'

import { useI18n } from '../i18n/LanguageContext'

export function NotFoundPage() {
  const { t } = useI18n()

  return (
    <section className="min-h-screen bg-background px-6 py-24 text-center">
      <h1 className="text-4xl font-semibold text-foreground">{t.app.notFoundTitle}</h1>
      <p className="mt-4 text-muted-foreground">{t.app.notFoundText}</p>
      <Link className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-primary-foreground" to="/">
        {t.app.backHome}
      </Link>
    </section>
  )
}

export default NotFoundPage
