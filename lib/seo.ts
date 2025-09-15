// SEO metadata utilities for Next.js

import type { Metadata } from 'next';
import type { PostSEOData, PageSEOData, GeneralSettings } from '@/graphql/queries/seo';
import { getGeneralSettings } from '@/graphql/api/seo';

/**
 * Check if SEO indexing is globally enabled and page allows indexing
 */
function shouldAllowIndexing(seoData: PostSEOData | PageSEOData): boolean {

    return seoData.seo?.metaRobotsNoindex !== 'noindex';
}

/**
 * Check if SEO following is globally enabled and page allows following
 */
function shouldAllowFollowing(seoData: PostSEOData | PageSEOData): boolean {

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
 * Generate OpenGraph metadata for different content types
 */
function getMetaOpenGraph(
    seoData: PostSEOData | PageSEOData,
    title: string,
    description: string,
    fullUrl: string,
    generalSettings?: GeneralSettings,
    contentType: 'page' | 'post' = 'page'
) {
    const ogImage = seoData.seo?.opengraphImage?.sourceUrl;

    const openGraphDescription = seoData.seo?.opengraphDescription || description;
    const baseOpenGraph = {
        type: contentType === 'post' ? 'article' as const : 'website' as const,
        title: seoData.seo?.title || title,
        ...(openGraphDescription && { description: openGraphDescription }),
        url: fullUrl,
        ...(generalSettings?.title && { siteName: generalSettings.title }),
        locale: 'nb-NO', // can be made dynamic later
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
    };

    // Add specific fields for articles (posts)
    if (contentType === 'post') {
        return {
            ...baseOpenGraph,
            publishedTime: seoData.date,
            modifiedTime: seoData.modified,
            ...(seoData.seo?.opengraphAuthor && {
                authors: [seoData.seo.opengraphAuthor],
            }),
        };
    }

    // Return base OpenGraph for pages
    return baseOpenGraph;
}

/**
 * Generate JSON-LD structured data for different content types
 */
function getMetaJsonLd(
    seoData: PostSEOData | PageSEOData,
    title: string,
    description: string,
    fullUrl: string,
    siteUrl: string,
    generalSettings?: GeneralSettings,
    contentType: 'page' | 'post' = 'page'
) {
    const ogImage = seoData.seo?.opengraphImage?.sourceUrl;

    const baseStructuredData = {
        '@context': 'https://schema.org',
        '@type': contentType === 'post' ? 'Article' : 'WebPage',
        ...(description && { description }),
        url: fullUrl,
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
    };

    // Add specific fields for articles (posts)
    if (contentType === 'post') {
        return {
            ...baseStructuredData,
            headline: title,
            datePublished: seoData.date,
            dateModified: seoData.modified,
            ...(( seoData.seo?.opengraphAuthor || generalSettings?.title) && {
                author: {
                    '@type': 'Organization',
                    name: seoData.seo?.opengraphAuthor || generalSettings?.title,
                },
            }),
            ...(generalSettings?.title && {
                publisher: {
                    '@type': 'Organization',
                    name: generalSettings.title,
                    url: siteUrl,
                },
            }),
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': fullUrl,
            },
        };
    }

    // Return base structured data for pages
    return {
        ...baseStructuredData,
        name: title,
    };
}

/**
 * Generate Next.js metadata from WordPress SEO data
 * @param seoData - SEO data from WordPress
 * @param generalSettings - General WordPress settings
 * @param baseUrl - Base URL of the site
 * @param contentType - Type of content: 'page' for pages/homepage, 'post' for blog posts
 */
export function generateMetadataFromSEO(
    seoData: PostSEOData | PageSEOData,
    generalSettings?: GeneralSettings,
    baseUrl?: string,
    contentType: 'page' | 'post' = 'page'
): Metadata {
    const siteUrl = baseUrl || process.env.NEXT_PUBLIC_API_URL || '';
    const fullUrl = seoData.slug === '' ? siteUrl : `${siteUrl}/${seoData.slug}`;

    // Use SEO title or fallback to post title
    const title = seoData.seo?.title || seoData.title;

    // Use SEO description or fallback to excerpt/content or general settings
    const description = seoData.seo?.metaDesc ||
        ('excerpt' in seoData ? seoData.excerpt : '') ||
        generalSettings?.description;


    // Twitter description or fallback to meta description
    const twitterDescription = seoData.seo?.twitterDescription || description;

    // Twitter image or fallback to OpenGraph image
    const twitterImage = seoData.seo?.twitterImage?.srcSet || seoData.seo?.opengraphImage?.sourceUrl;

    const metadata: Metadata = {
        title,
        ...(description && { description }),

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
        openGraph: getMetaOpenGraph(seoData, title, description || '', fullUrl, generalSettings, contentType),

        // Twitter
        twitter: {
            card: 'summary_large_image',
            title: seoData.seo?.title || title,
            ...(twitterDescription && { description: twitterDescription }),
            ...(generalSettings?.title && { site: `@${generalSettings.title}` }),
            ...(seoData.seo?.opengraphAuthor && { creator: `@${seoData.seo.opengraphAuthor}` }),
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
            'application/ld+json': JSON.stringify(
                getMetaJsonLd(seoData, title, description || '', fullUrl, siteUrl, generalSettings, contentType)
            ),
        },
    };

    return metadata;
}
/**
 * Generate metadata for not found pages using WordPress general settings
 * @param entityType - Type of entity (Page, Post, Service, etc.)
 * @param baseUrl - Base URL of the site
 * @param customTitle - Custom title for 404 page (fallback)
 * @param customDescription - Custom description for 404 page (fallback)
 */
export async function generateNotFoundMetadata(
    entityType: string = 'Page',
    baseUrl?: string,
    customTitle?: string,
    customDescription?: string
): Promise<Metadata> {
    const siteUrl = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || '';

    let generalSettings;

    // Always fetch general settings from WordPress
    try {
        generalSettings = await getGeneralSettings(['404', 'general-settings']);
        console.log(generalSettings, 'generalSettings')
    } catch (error) {
        console.log('Failed to fetch WordPress general settings:', error);
    }

    const siteName = generalSettings?.title || 'OptiGrid';
    const defaultTitle = customTitle || `404 - ${siteName}`;
    const defaultDescription = customDescription ||
        generalSettings?.description ||
        `The requested ${entityType.toLowerCase()} could not be found. Please check the URL or return to our homepage.`;
    return {
        title: defaultTitle,
        ...(defaultDescription && { description: defaultDescription }),
        robots: {
            index: false, // 404 pages should never be indexed
            follow: false, // Don't follow links on 404 pages
            noarchive: true, // Don't cache 404 pages
            nosnippet: true, // Don't show snippets for 404 pages
        },
        alternates: {
            canonical: siteUrl,
        },
        // Add structured data for 404 pages
        other: {
            'application-ld+json': JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebPage',
                name: defaultTitle,
                ...(defaultDescription && { description: defaultDescription }),
                url: siteUrl,
                mainEntity: {
                    '@type': 'Organization',
                    name: siteName,
                    url: siteUrl,
                    ...(generalSettings?.description && { description: generalSettings.description }),
                }
            }),
        },
    };
}
