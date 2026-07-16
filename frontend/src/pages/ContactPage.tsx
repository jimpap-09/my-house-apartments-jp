import { ArrowLeft, Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

export function ContactPage() {
    return (
        <section className="px-6 py-12">
            <div className="mx-auto flex max-w-3xl flex-col gap-8 rounded-3xl border border-border bg-card p-8 shadow-soft">
                <Link to="/" className="inline-flex w-fit items-center gap-2 text-sm font-medium text-primary transition hover:opacity-80">
                    <ArrowLeft size={16} />
                    Πίσω στη λίστα
                </Link>

                <div className="grid gap-4">
                    <p className="eyebrow">Contact</p>
                    <h1 className="text-3xl font-serif text-charcoal sm:text-4xl">Επικοινωνήστε μαζί μας</h1>
                    <p className="text-base leading-7 text-muted-foreground">
                        Μπορείτε να μας καλέσετε ή να μας στείλετε email για οποιαδήποτε απορία σχετικά με τα διαμερίσματα.
                    </p>
                </div>

                <div className="grid gap-4 rounded-2xl border border-border bg-background p-6 sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                        <Phone className="mt-1 text-primary" size={20} />
                        <div>
                            <p className="font-semibold text-charcoal">Τηλέφωνο</p>
                            <p className="text-muted-foreground">698 350 5842</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Mail className="mt-1 text-primary" size={20} />
                        <div>
                            <p className="font-semibold text-charcoal">Email</p>
                            <p className="text-muted-foreground">johnpap26@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
