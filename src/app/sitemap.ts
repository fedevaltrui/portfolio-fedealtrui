import { MetadataRoute } from 'next'
import { getProjectSlugs } from '@/lib/content'
import { i18n } from '@/i18n/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://federicoaltrui.com'

  const allRoutes: MetadataRoute.Sitemap = [];

  i18n.locales.forEach((locale) => {
    // Static routes
    const routes = ['', '/projects', '/about', '/contact'].map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic projects
    const slugs = getProjectSlugs()
    const projectRoutes = slugs.map((slug) => ({
      url: `${baseUrl}/${locale}/projects/${slug}`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

    allRoutes.push(...routes, ...projectRoutes);
  });

  return allRoutes;
}
