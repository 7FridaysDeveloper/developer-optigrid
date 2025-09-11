// Utility functions for calculating reading time

/**
 * Calculate reading time for content
 * @param content - HTML or text content
 * @param wordsPerMinute - Average reading speed (default 200 words per minute)
 * @returns Reading time string in format "X min read"
 */
export function calculateReadTime(
    content: string,
    wordsPerMinute: number = 200
): string {
    if (!content) return '1 min read';

    // Remove HTML tags and get plain text
    const plainText = content.replace(/<[^>]*>/g, '');

    // Split by whitespace and filter out empty strings
    const words = plainText
        .split(/\s+/)
        .filter(word => word.length > 0);

    const wordCount = words.length;

    // Calculate reading time in minutes (minimum 1 minute)
    const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

    return `${minutes} min read`;
}

/**
 * Calculate reading time from WordPress post
 * @param post - WordPress post with content
 * @param wordsPerMinute - Average reading speed (default 200 words per minute)
 * @returns Reading time string
 */
export function calculatePostReadTime(
    post: { content?: string; excerpt?: string },
    wordsPerMinute: number = 200
): string {
    const content = post.content || post.excerpt || '';
    return calculateReadTime(content, wordsPerMinute);
}

/**
 * Get word count from content
 * @param content - HTML or text content
 * @returns Number of words
 */
export function getWordCount(content: string): number {
    if (!content) return 0;

    const plainText = content.replace(/<[^>]*>/g, '');
    const words = plainText
        .split(/\s+/)
        .filter(word => word.length > 0);

    return words.length;
}
