import { Metadata } from "next";
import { getDictionary, Locale } from "@/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    return {
        title: `${dict.about.title} | Federico Altrui`,
    };
}

export async function generateStaticParams() {
    return [
        { lang: 'en' },
        { lang: 'es' },
    ];
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    const t = dict.about;

    return (
        <div className="container mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8 animate-fade-in">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-8">{t.title}</h1>

            <div className="space-y-8 text-muted-foreground leading-relaxed">
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground">{t.philosophy_title}</h2>
                    <p>{t.philosophy_p1}</p>
                    <p>{t.philosophy_p2}</p>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight text-foreground mt-12">{t.experience_title}</h2>
                    <div className="space-y-6">
                        <div className="border-l-2 border-border pl-4">
                            <h3 className="font-semibold text-foreground text-lg">{t.experience_lanus_role}</h3>
                            <p className="text-sm">{t.experience_lanus_company}</p>
                            <p className="mt-2">{t.experience_lanus_desc}</p>
                        </div>
                        {/* Add more experience blocks here */}
                    </div>
                </section>
            </div>
        </div>
    );
}
