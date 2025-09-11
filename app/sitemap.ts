import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://optigrid.com'

    return [
        {
            url: `${baseUrl}/sitemap/pages/sitemap.xml`,
            lastModified: new Date(),
        },
        {
            url: `${baseUrl}/sitemap/posts/sitemap.xml`,
            lastModified: new Date(),
        },
    ]
}