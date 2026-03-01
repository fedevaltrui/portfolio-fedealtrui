import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllProjects } from "@/lib/content";
import { getDictionary, Locale } from "@/i18n/config";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params;
    const dict = await getDictionary(lang as Locale);
    return {
        title: `${dict.projects.title} | Federico Altrui`,
    };
}

export async function generateStaticParams() {
    return [
        { lang: 'en' },
        { lang: 'es' },
    ];
}

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params;
    const locale = lang as Locale;
    const projects = getAllProjects(locale);
    const dict = await getDictionary(locale);
    const t = dict.projects;

    return (
        <div className="container mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8 animate-fade-in">
            <div className="mb-12">
                <Link href={`/${lang}`} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t.back_home}
                </Link>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{t.title}</h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                    {t.description}
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <Link
                        key={project.slug}
                        href={`/${lang}/projects/${project.slug}`}
                        className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-[var(--color-granate-light)]"
                    >
                        <div className="space-y-4">
                            {project.metadata.featured && (
                                <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-xs font-medium w-fit text-muted-foreground group-hover:bg-[var(--color-granate)]/10 group-hover:text-[var(--color-granate)] transition-colors">
                                    {dict.home.work.featured}
                                </div>
                            )}
                            <h3 className="text-xl font-bold tracking-tight">{project.metadata.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-3">
                                {project.metadata.description}
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground pt-2">
                                {project.metadata.technologies.map((tech) => (
                                    <span key={tech} className="rounded bg-muted/60 px-2 py-1">{tech}</span>
                                ))}
                            </div>
                        </div>
                        <div className="mt-6 flex items-center text-sm font-medium text-[var(--color-granate)]">
                            {dict.home.work.read_case_study} <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
