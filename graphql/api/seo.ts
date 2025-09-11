// API client for fetching SEO data

import { fetchGraphQl } from '../fetchGraphQl';
import { GET_POST_SEO_QUERY, GET_PAGE_SEO_QUERY, PostSEOData, PageSEOData, GeneralSettings, PostSEOResponse, PageSEOResponse } from '../queries/seo';

export interface SEOData {
    seoData: PostSEOData | PageSEOData;
    generalSettings: GeneralSettings;
}

/**
 * Fetch SEO data by slug (works for both posts and pages)
 * @throws {Error} When post/page is not found or fetch fails
 */
export async function getSEOBySlug(
    slug: string,
    type: 'post' | 'page' = 'post',
    tags: string[] = []
): Promise<SEOData> {
    const query = type === 'post' ? GET_POST_SEO_QUERY : GET_PAGE_SEO_QUERY;
    const data = await fetchGraphQl<PostSEOResponse | PageSEOResponse>(query, { slug }, tags, slug);

    // Extract SEO data based on type
    const seoData = type === 'post' ? (data as PostSEOResponse).postBy : (data as PageSEOResponse).pageBy;

    if (!seoData) {
        throw new Error(`${type.charAt(0).toUpperCase() + type.slice(1)} with slug "${slug}" not found`);
    }

    return {
        seoData,
        generalSettings: data.generalSettings,
    };
}