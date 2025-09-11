// Common types for WordPress GraphQL API

/**
 * Base interface for all WordPress posts - contains common fields used across all post queries
 */
export interface WordPressPostBase {
    databaseId: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    date: string;
    modified: string;
    status: string;
    featuredImage?: {
        node: WordPressImage;
    };
    author: {
        node: WordPressAuthor;
    };
    categories: {
        nodes: WordPressCategory[];
    };
    tags: {
        nodes: WordPressTag[];
    };
}

/**
 * WordPress related post - uses base interface without relatedPosts to avoid circular references
 */
export type WordPressRelatedPost = WordPressPostBase;

export interface WordPressImage {
    sourceUrl: string;
    altText?: string;
    mediaDetails?: {
        width: number;
        height: number;
    };
}

export interface WordPressAuthor {
    id: string;
    name: string;
    description?: string;
    avatar?: {
        url: string;
    };
}

export interface WordPressCategory {
    id: string;
    name: string;
    slug: string;
}

export interface WordPressTag {
    id: string;
    name: string;
    slug: string;
}

export interface WordPressSEO {
    title?: string;
    metaDesc?: string;
    opengraphImage?: {
        sourceUrl: string;
    };
}
