import { ArrowLeft, Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

import { useI18n } from '../i18n/LanguageContext'

export function ContactPage() {
    const { t } = useI18n()

    return (
        <section className="px-6 py-12">
            <div className="mx-auto flex max-w-3xl flex-col gap-8 rounded-3xl border border-border bg-card p-8 shadow-soft">
                <Link to="/" className="inline-flex w-fit items-center gap-2 text-sm font-medium text-primary transition hover:opacity-80">
                    <ArrowLeft size={16} />
                    {t.app.backToList}
                </Link>

                <div className="grid gap-4">
                    <p className="eyebrow">{t.app.contact}</p>
                    <h1 className="text-3xl font-serif text-charcoal sm:text-4xl">{t.app.contactTitle}</h1>
                    <p className="text-base leading-7 text-muted-foreground">
                        {t.app.contactIntro}
                    </p>
                </div>

                <div className="grid gap-4 rounded-2xl border border-border bg-background p-6 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                        <Phone className="mt-1 text-primary" size={20} />
                        <div>
                            <p className="font-semibold text-charcoal">{t.app.phone}</p>
                            <p className="text-muted-foreground">698 350 5842</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Mail className="mt-1 text-primary" size={20} />
                        <div>
                            <p className="font-semibold text-charcoal">{t.app.email}</p>
                            <p className="text-muted-foreground">johnpap26@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
