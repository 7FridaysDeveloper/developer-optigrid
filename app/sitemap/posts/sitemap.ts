import { MetadataRoute } from "next";
import {getAllPosts} from "@/graphql/api/posts";
export const dynamic = 'force-static'
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://optigrid.com'

    try {
        const posts = await getAllPosts(['blogs', 'sitemap'])
        return posts.map((post) => ({
            url: `${baseUrl}/blogs/${post.slug}/`,
            lastModified: new Date(post.modified || post.date),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }))
    } catch (error) {
        console.error('Error fetching posts for sitemap:', error)
        return []
    }
}