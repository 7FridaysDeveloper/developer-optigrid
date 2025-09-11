// API client for fetching post by ID

import { fetchGraphQl } from '../fetchGraphQl';
import { GET_POST_BY_ID_QUERY, GET_POST_BY_ID_SIMPLE_QUERY, WordPressPostById, WordPressPostByIdSimple } from '../queries/post-by-id';

/**
 * Fetch post by database ID with all fields including related posts
 * @throws {Error} When post is not found or fetch fails
 */
export async function getPostById(id: number | string): Promise<WordPressPostById> {
    const data = await fetchGraphQl<any>(GET_POST_BY_ID_QUERY, { id: id.toString() }, [`post-${id}`], `post-${id}`);

    if (!data.post) {
        throw new Error(`Post with ID ${id} not found`);
    }

    return data.post;
}

/**
 * Fetch post by database ID without related posts (optimized for performance)
 * @throws {Error} When post is not found or fetch fails
 */
export async function getPostByIdSimple(id: number | string): Promise<WordPressPostByIdSimple> {
    const data = await fetchGraphQl<any>(GET_POST_BY_ID_SIMPLE_QUERY, { id: id.toString() }, [`post-simple-${id}`], `post-simple-${id}`);

    if (!data.post) {
        throw new Error(`Post with ID ${id} not found`);
    }

    return data.post;
}

/**
 * Fetch multiple posts by IDs with custom cache tags
 * @param ids Array of post IDs to fetch
 * @param tags Optional array of cache tags for revalidation
 * @throws {Error} When no posts are found or all requests fail
 */
export async function getPostsByIds(ids: (number | string)[], tags: string[] = []): Promise<WordPressPostById[]> {
    const postPromises = ids.map(id => getPostByIdWithTags(id, tags));
    const results = await Promise.allSettled(postPromises);

    const successfulPosts: WordPressPostById[] = [];
    const errors: string[] = [];

    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            successfulPosts.push(result.value);
        } else {
            errors.push(`Post ${ids[index]}: ${result.reason}`);
        }
    });

    if (successfulPosts.length === 0) {
        throw new Error(`No posts found. Errors: ${errors.join('; ')}`);
    }

    return successfulPosts;
}

/**
 * Fetch post by database ID with custom cache tags
 * @param id Post ID
 * @param tags Array of cache tags for revalidation
 * @throws {Error} When post is not found or fetch fails
 */
async function getPostByIdWithTags(id: number | string, tags: string[] = []): Promise<WordPressPostById> {
    const defaultTags = [`post-${id}`];
    const allTags = [...defaultTags, ...tags];

    const data = await fetchGraphQl<any>(GET_POST_BY_ID_QUERY, { id: id.toString() }, allTags, `post-${id}`);

    if (!data.post) {
        throw new Error(`Post with ID ${id} not found`);
    }

    return data.post;
}
