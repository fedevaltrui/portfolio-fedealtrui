import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { getProjectBySlug, getProjectSlugs } from "@/lib/content";
import { Metadata } from "next";
import { Locale, i18n, getDictionary } from "@/i18n/config";

interface Props {
    params: Promise<{ slug: string, lang: string }>;
}

export async function generateStaticParams() {
    const slugs = getProjectSlugs();
    const params: { slug: string, lang: string }[] = [];

    slugs.forEach(slug => {
        i18n.locales.forEach(lang => {
            params.push({ slug, lang });
        });
    });

    return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, lang } = await params;
    const project = getProjectBySlug(slug, lang as Locale);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: `${project.metadata.title} | Federico Altrui`,
        description: project.metadata.description,
    };
}

export default async function ProjectPage({ params }: Props) {
    const { slug, lang } = await params;
    const locale = lang as Locale;
    const project = getProjectBySlug(slug, locale);
    const dict = await getDictionary(locale);

    if (!project) {
        notFound();
    }

    return (
        <article className="container mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8 animate-fade-in">
            <div className="mb-12">
                <Link href={`/${lang}/projects`} className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {dict.projects.back_projects}
                </Link>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">{project.metadata.title}</h1>
                <div className="flex items-center text-sm text-muted-foreground gap-4">
                    <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        {new Date(project.metadata.date).toLocaleDateString(lang, { year: 'numeric', month: 'long' })}
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                        {project.metadata.technologies.map((tech) => (
                            <span key={tech} className="rounded bg-muted/60 px-2 py-1">{tech}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Super simple markdown rendering for V1. In a real scenario you'd use react-markdown or MDXRemote */}
            <div
                className="prose prose-neutral dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: project.content.replace(/\n/g, '<br />') }}
            />
        </article>
    );
}
