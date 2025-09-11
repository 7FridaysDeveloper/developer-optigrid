import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://optigrid.com'

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api/',
                '/_next/',
                '/admin/',
                '/wp-admin/',
                '/wp-content/',
                '/wp-includes/',
                '*.php',
                '/*.php$',
                '/private/',
                '/temp/',
            ],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}

