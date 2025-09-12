// API client for fetching all posts

import { fetchGraphQl } from '../fetchGraphQl';
import { GET_ALL_POSTS_QUERY, WordPressPostList } from '../queries/posts';
import { calculatePostReadTime } from "@/utils/readTime";
import type { BlogPost } from "@/types/blog";

/**
 * Fetch all posts
 * @throws {Error} When fetch fails
 */
export async function getAllPosts(tags: string[] = ['blog']): Promise<WordPressPostList[]> {
    const data = await fetchGraphQl<any>(GET_ALL_POSTS_QUERY, { first: 10000 }, tags, 'blogs');
    return data.posts.nodes;
}

/**
 * Transform WordPress posts to BlogPost format
 */
export function transformWordPressPosts(posts: WordPressPostList[] | null | undefined): BlogPost[] {
    if (!posts) return [];

    return posts.map(post => ({
        title: post.title,
        excerpt: post.excerpt ?? '',
        date: new Date(post.date),
        image: post.featuredImage?.node?.sourceUrl || '',
        thumb: post.featuredImage?.node?.sourceUrl || '',
        slug: post.slug,
        author: post.author?.node?.name,
        readTime: calculatePostReadTime(post),
        category: post.categories?.nodes?.map(cat => cat.name) || [],
        tags: post.tags?.nodes?.map(tag => tag.name) || []
    }));
}
