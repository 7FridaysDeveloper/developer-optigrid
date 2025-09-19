// API client for fetching post by slug

import { fetchGraphQl } from '../fetchGraphQl';
import { GET_POST_BY_SLUG_QUERY, WordPressPostBySlug } from '../queries/post-by-slug';

/**
 * Fetch post by slug
 * @throws {Error} When post is not found or fetch fails
 */
export async function getPostBySlug(slug: string): Promise<WordPressPostBySlug | null> {
    const data = await fetchGraphQl<any>(GET_POST_BY_SLUG_QUERY, { slug }, [slug], `post-slug-${slug}`);
    if (!data.postBy) {
        return null
    }

    return data.postBy;
}
