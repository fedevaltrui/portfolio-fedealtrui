import { Metadata } from "next";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { getDictionary, Locale } from "@/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    return {
        title: `${dict.contact.title} | Federico Altrui`,
    };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const t = dict.contact;

    return (
        <div className="container mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8 animate-fade-in">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">{t.title}</h1>
            <p className="text-lg text-muted-foreground mb-12">
                {t.description}
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
                <Link
                    href="mailto:fedealtrui@gmail.com"
                    className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-[var(--color-granate-light)]"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-muted group-hover:bg-[var(--color-granate)]/10 text-muted-foreground group-hover:text-[var(--color-granate)] transition-colors">
                            <Mail className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-semibold tracking-tight">{t.email}</h2>
                    </div>
                    <p className="text-sm text-foreground/80 break-all">
                        fedealtrui@gmail.com
                    </p>
                </Link>

                <Link
                    href="http://linkedin.com/in/federicoaltrui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-[var(--color-granate-light)]"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-muted group-hover:bg-[#0A66C2]/10 text-muted-foreground group-hover:text-[#0A66C2] transition-colors">
                            <Linkedin className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-semibold tracking-tight">{t.linkedin}</h2>
                    </div>
                    <p className="text-sm text-foreground/80 break-all">
                        linkedin.com/in/federicoaltrui
                    </p>
                </Link>

                <Link
                    href="https://github.com/fedevaltrui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-foreground"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-full bg-muted group-hover:bg-foreground/10 text-muted-foreground group-hover:text-foreground transition-colors">
                            <Github className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-semibold tracking-tight">{t.github}</h2>
                    </div>
                    <p className="text-sm text-foreground/80 break-all">
                        github.com/fedevaltrui
                    </p>
                </Link>
            </div>
        </div>
    );
}
