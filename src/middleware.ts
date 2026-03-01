import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './i18n/config';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
    // Check if there is any cookie with the locale
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    if (cookieLocale && i18n.locales.includes(cookieLocale as any)) {
        return cookieLocale;
    }

    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {};
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

    // Use negotiator and intl-localematcher to get best locale
    const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

    const locales: string[] = i18n.locales.map(l => l);
    try {
        return matchLocale(languages, locales, i18n.defaultLocale);
    } catch (e) {
        return i18n.defaultLocale;
    }
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Paths we don't want to redirect:
    const missingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    );

    // Exclude static assets, api routes, icons, robots, etc.
    if (
        !missingLocale ||
        pathname.includes('/api/') ||
        pathname.includes('.') ||
        pathname.startsWith('/_next/')
    ) {
        return NextResponse.next();
    }

    // Missing locale, redirect to localized path
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
    // Do not run the middleware on the following paths:
    // - public files
    // - api routes
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|resume-en.pdf|resume-es.pdf).*)'],
};
