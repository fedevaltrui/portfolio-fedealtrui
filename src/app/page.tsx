'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { i18n, type Locale } from '@/i18n/config';

export default function RootRoute() {
    const router = useRouter();

    useEffect(() => {
        // 1. Try to get saved cookie
        const match = document.cookie.match(new RegExp('(^| )NEXT_LOCALE=([^;]+)'));
        const savedLocale = match ? match[2] : null;

        if (savedLocale && i18n.locales.includes(savedLocale as any)) {
            router.replace(`/${savedLocale}`);
            return;
        }

        // 2. Fallback to browser language matching
        const browserLang = navigator.language.split('-')[0];
        if (i18n.locales.includes(browserLang as any)) {
            router.replace(`/${browserLang}`);
        } else {
            router.replace(`/${i18n.defaultLocale}`);
        }
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 rounded-full border-4 border-muted border-t-[var(--color-granate)] animate-spin"></div>
                <p className="text-muted-foreground text-sm font-medium animate-pulse">Routing to localized portfolio...</p>
            </div>
        </div>
    );
}
