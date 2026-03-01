import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Database, Server, Code2, GitMerge } from "lucide-react";
import { getDictionary, Locale } from "@/i18n/config";
import { getAllProjects } from "@/lib/content";

export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'es' },
  ];
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const t = dict.home;
  const projects = getAllProjects(locale).filter(p => p.metadata.featured).slice(0, 3);

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="container mx-auto max-w-5xl px-4 pt-24 sm:px-6 lg:px-8 mt-12 mb-8 animate-fade-in">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {t.hero.title_1} <br className="hidden sm:block" />
            {t.hero.title_2} <span className="text-[var(--color-granate)]">{t.hero.title_3}</span> {t.hero.title_4}
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg sm:leading-8">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href={`/${lang}/projects`}>{t.hero.view_case_studies}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href={`/${lang}/contact`}>{t.hero.contact_me}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Selected Work Section */}
      <section id="work" className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 animate-slide-up">
        <div className="space-y-6">
          <div className="flex justify-between items-end">
            <h2 className="text-3xl font-bold tracking-tight">{t.work.title}</h2>
            <Link href={`/${lang}/projects`} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group flex items-center">
              {t.work.view_all} <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
            </Link>
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
                      {t.work.featured}
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
                  {t.work.read_case_study} <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}

            {projects.length === 0 && (
              <p className="text-sm text-muted-foreground">{t.work.no_projects}</p>
            )}
          </div>
        </div>
      </section>

      {/* Technical Expertise */}
      <section className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 border-t border-border/40 pt-16">
        <h2 className="text-3xl font-bold tracking-tight mb-8">{t.expertise.title}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex gap-4 p-4 rounded-lg bg-muted/40 border border-transparent hover:border-border transition-colors">
            <Server className="h-6 w-6 text-[var(--color-granate)] shrink-0" />
            <div>
              <h3 className="font-semibold">{t.expertise.backend_title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {t.expertise.backend_desc}
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-4 rounded-lg bg-muted/40 border border-transparent hover:border-border transition-colors">
            <Code2 className="h-6 w-6 text-[var(--color-granate)] shrink-0" />
            <div>
              <h3 className="font-semibold">{t.expertise.frontend_title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {t.expertise.frontend_desc}
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-4 rounded-lg bg-muted/40 border border-transparent hover:border-border transition-colors">
            <GitMerge className="h-6 w-6 text-[var(--color-granate)] shrink-0" />
            <div>
              <h3 className="font-semibold">{t.expertise.devops_title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {t.expertise.devops_desc}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
