// Transformation functions for WordPress GraphQL data

import { calculatePostReadTime } from "@/utils/readTime";
import type { BlogPost } from "@/types/blog";
import type { WordPressRelatedPost } from "./types/types";
import type { WordPressPostBySlug } from "./queries/post-by-slug";
import type { WordPressPostById } from "./queries/post-by-id";
import type { WordPressPostList } from "./queries/posts";

type WordPressPostLike = WordPressPostBySlug | WordPressPostById | WordPressPostList | WordPressRelatedPost;

/**
 * Transform WordPress post (or related post) to BlogPost format
 */
export function transformWordPressPost(post: WordPressPostLike): BlogPost {
    return {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: 'content' in post ? post.content : '', // content
        image: post.featuredImage?.node?.sourceUrl || '',
        thumb: post.featuredImage?.node?.sourceUrl || '',
        date: new Date(post.date),
        author: post.author?.node?.name || '',
        readTime: calculatePostReadTime(post),
        category: post.categories?.nodes?.map(cat => cat.name) || [],
        tags: post.tags?.nodes?.map(tag => tag.name) || []
    };
}

/**
 * Transform array of WordPress related posts to BlogPost array
 */
export function transformWordPressRelatedPosts(relatedPosts: WordPressRelatedPost[]): BlogPost[] {
    return relatedPosts.map(transformWordPressPost);
}
