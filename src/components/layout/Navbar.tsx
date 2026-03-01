import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Locale } from "@/i18n/config";

export function Navbar({ dict, currentLocale }: { dict: any, currentLocale: Locale }) {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href={`/${currentLocale}`} className="flex items-center space-x-2 transition-opacity hover:opacity-80">
                    <span className="font-bold text-lg tracking-tight">Federico Altrui</span>
                </Link>

                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
                    <Link href={`/${currentLocale}/projects`} className="transition-colors hover:text-[var(--color-granate)]">
                        {dict.work}
                    </Link>
                    <Link href={`/${currentLocale}/about`} className="transition-colors hover:text-[var(--color-granate)]">
                        {dict.about}
                    </Link>
                    <Link href={`/${currentLocale}/contact`} className="transition-colors hover:text-[var(--color-granate)]">
                        {dict.contact}
                    </Link>
                    <Button asChild variant="outline" size="sm" className="ml-2 group">
                        <Link href={`/resume-${currentLocale}.pdf`} target="_blank" rel="noopener noreferrer">
                            {dict.resume}
                            <span className="ml-2 transition-transform group-hover:translate-x-0.5">→</span>
                        </Link>
                    </Button>
                    <LanguageSwitcher currentLocale={currentLocale} />
                </nav>

                <div className="flex items-center gap-4 md:hidden">
                    <LanguageSwitcher currentLocale={currentLocale} />
                    <Button asChild variant="ghost" size="sm">
                        <Link href={`/${currentLocale}/contact`}>{dict.contact}</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
