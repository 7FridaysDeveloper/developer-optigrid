// SEO metadata utilities for Next.js

import type { Metadata } from 'next';
import type { PostSEOData, PageSEOData, GeneralSettings } from '@/graphql/queries/seo';

/**
 * Check if SEO indexing is globally enabled and page allows indexing
 */
function shouldAllowIndexing(seoData: PostSEOData | PageSEOData): boolean {
    if (process.env.NEXT_PUBLIC_ENABLE_SEO_INDEXING !== 'true') {
        return false;
    }
    return seoData.seo?.metaRobotsNoindex !== 'noindex';
}

/**
 * Check if SEO following is globally enabled and page allows following
 */
function shouldAllowFollowing(seoData: PostSEOData | PageSEOData): boolean {
    if (process.env.NEXT_PUBLIC_ENABLE_SEO_INDEXING !== 'true') {
        return false;
    }
    return seoData.seo?.metaRobotsNofollow !== 'nofollow';
}

/**
 * Get image MIME type based on URL extension
 */
function getImageType(imageUrl: string): string {
    const extension = imageUrl.split('.').pop()?.toLowerCase();
    switch (extension) {
        case 'png':
            return 'image/png';
        case 'webp':
            return 'image/webp';
        case 'gif':
            return 'image/gif';
        case 'svg':
            return 'image/svg+xml';
        default:
            return 'image/jpeg';
    }
}

/**
 * Generate Next.js metadata from WordPress SEO data
 */
export function generateMetadataFromSEO(
    seoData: PostSEOData | PageSEOData,
    generalSettings?: GeneralSettings,
    baseUrl?: string
): Metadata {
    const siteUrl = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://optigrid.energy';
    const fullUrl = `${siteUrl}/${seoData.slug}`;

    // Use SEO title or fallback to post title
    const title = seoData.seo?.title || seoData.title;

    // Use SEO description or fallback to excerpt/content or general settings
    const description = seoData.seo?.metaDesc ||
        ('excerpt' in seoData ? seoData.excerpt : '') ||
        generalSettings?.description;

    // Use SEO image or fallback to featured image
    const ogImage = seoData.seo?.opengraphImage?.sourceUrl;

    // Twitter description or fallback to meta description
    const twitterDescription = seoData.seo?.twitterDescription || description;

    // Twitter image or fallback to OpenGraph image
    const twitterImage = seoData.seo?.twitterImage?.srcSet || ogImage;

    const metadata: Metadata = {
        title,
        description,

        // Canonical URL
        alternates: {
            canonical: seoData.seo?.canonical || fullUrl,
        },

        // Keywords
        ...(seoData.seo?.metaKeywords && {
            keywords: seoData.seo.metaKeywords.split(',').map(k => k.trim()),
        }),

        // Robots - global SEO indexing control + individual page settings
        robots: {
            index: shouldAllowIndexing(seoData),
            follow: shouldAllowFollowing(seoData),
        },

        // OpenGraph
        openGraph: {
            type: 'article',
            title: seoData.seo?.title || title,
            description: seoData.seo?.opengraphDescription || description,
            url: fullUrl,
            siteName: generalSettings?.title || 'OptiGrid',
            locale: 'en_US', // can be made dynamic later
            publishedTime: seoData.date,
            modifiedTime: seoData.modified,
            ...(ogImage && {
                images: [
                    {
                        url: ogImage,
                        alt: seoData.seo?.opengraphImage?.altText || title,
                        width: 1200,
                        height: 630,
                        type: getImageType(ogImage),
                    },
                ],
            }),
            ...(seoData.seo?.opengraphAuthor && {
                authors: [seoData.seo.opengraphAuthor],
            }),
        },

        // Twitter
        twitter: {
            card: 'summary_large_image',
            title: seoData.seo?.title || title,
            description: twitterDescription,
            site: '@OptiGrid', // can be made dynamic from settings
            creator: seoData.seo?.opengraphAuthor ? `@${seoData.seo.opengraphAuthor}` : '@OptiGrid',
            ...(twitterImage && {
                images: [
                    {
                        url: twitterImage,
                        alt: seoData.seo?.twitterImage?.altText || seoData.seo?.opengraphImage?.altText || title,
                        width: 1200,
                        height: 630,
                    },
                ],
            }),
        },

        // JSON-LD Structured Data for better SEO
        other: {
            'application/ld+json': JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Article',
                headline: title,
                description: description,
                datePublished: seoData.date,
                dateModified: seoData.modified,
                author: {
                    '@type': 'Organization',
                    name: seoData.seo?.opengraphAuthor || generalSettings?.title || 'OptiGrid',
                },
                publisher: {
                    '@type': 'Organization',
                    name: generalSettings?.title || 'OptiGrid',
                    url: siteUrl,
                },
                url: fullUrl,
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': fullUrl,
                },
                ...(ogImage && {
                    image: [
                        {
                            '@type': 'ImageObject',
                            url: ogImage,
                            width: 1200,
                            height: 630,
                            caption: seoData.seo?.opengraphImage?.altText || title,
                        },
                    ],
                }),
                ...(seoData.seo?.metaKeywords && {
                    keywords: seoData.seo.metaKeywords.split(',').map(k => k.trim()),
                }),
            }),
        },
    };

    return metadata;
}

/**
 * Generate metadata for not found pages
 */
export function generateNotFoundMetadata(
    entityType: string = 'Page',
    baseUrl?: string
): Metadata {
    const siteUrl = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://optigrid.energy';

    return {
        title: `${entityType} Not Found`,
        description: `The requested ${entityType.toLowerCase()} could not be found.`,
        robots: {
            index: false, // 404 pages should never be indexed
            follow: process.env.NEXT_PUBLIC_ENABLE_SEO_INDEXING === 'true',
        },
        alternates: {
            canonical: siteUrl,
        },
    };
}
