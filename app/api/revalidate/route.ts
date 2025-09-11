import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');
    const secret = searchParams.get('secret');
    console.log(tag)
    // Check secret key
    if (secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json(
            { success: false, error: 'Invalid secret' },
            { status: 401 }
        );
    }

    // Check tag parameter
    if (!tag) {
        return NextResponse.json(
            { success: false, error: 'Tag parameter is required' },
            { status: 400 }
        );
    }

    try {
        if (tag === 'all') {
            // Clear all cache by revalidating common tags and paths
            const commonTags = ['blogs', 'sitemap', 'home', 'home-posts-picked'];
            const commonPaths = ['/', '/blogs', '/about', '/products', '/contact-us'];

            // Revalidate all common tags
            commonTags.forEach(commonTag => {
                revalidateTag(commonTag);
            });

            // Revalidate all common paths
            commonPaths.forEach(path => {
                revalidatePath(path);
            });

            return NextResponse.json({
                success: true,
                message: 'All cache cleared successfully',
                revalidated: true,
                tags: commonTags,
                paths: commonPaths,
                now: Date.now(),
            });
        } else {
            // Regular tag revalidation
            revalidateTag(tag);

            return NextResponse.json({
                success: true,
                message: `Tag "${tag}" revalidated successfully`,
                revalidated: true,
                now: Date.now(),
            });
        }
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error occurred',
            },
            { status: 500 }
        );
    }
}
