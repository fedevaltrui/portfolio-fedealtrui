"use client";

import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { i18n, Locale } from '@/i18n/config';

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
    const router = useRouter();
    const pathname = usePathname(); // e.g., "/en/about" or "/es/about"

    const switchLanguage = (newLocale: Locale) => {
        // Save to cookie so middleware picks it up next time
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`; // 1 year

        if (!pathname) return;

        // Replace the first path segment (the locale) with the new one
        const segments = pathname.split('/');
        if (segments.length > 1 && i18n.locales.includes(segments[1] as Locale)) {
            segments[1] = newLocale;
            const newPathname = segments.join('/');
            router.push(newPathname);
        } else {
            router.push(`/${newLocale}`);
        }

        // Refresh to trigger re-render of Server Components with new locale
        router.refresh();
    };

    return (
        <div className="flex gap-2 isolate">
            {i18n.locales.map((locale) => (
                <Button
                    key={locale}
                    variant={currentLocale === locale ? "default" : "ghost"}
                    size="sm"
                    onClick={() => switchLanguage(locale)}
                    className={`h-7 px-2 text-xs uppercase ${currentLocale === locale ? 'bg-[var(--color-granate)] text-white hover:bg-[var(--color-granate)]/90' : 'text-muted-foreground'}`}
                >
                    {locale}
                </Button>
            ))}
        </div>
    );
}
