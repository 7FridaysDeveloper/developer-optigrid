import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BlogMetadata } from "@/components/Blogs/BlogMetadata";
import { BlogContent } from "@/components/Blogs/BlogContent";
import { BlogSidebar } from "@/components/Blogs/BlogSidebar";
import { RelatedArticles } from "@/components/Blogs/RelatedArticles";
import { getSEOBySlug } from "@/graphql/api/seo";
import { generateMetadataFromSEO, generateNotFoundMetadata } from "@/lib/seo";
import { getPostBySlug } from "@/graphql/api/post-by-slug";
import { transformWordPressPost, transformWordPressRelatedPosts } from "@/graphql/transformers";
import { getAllPosts } from "@/graphql/api/posts";

// Route segment config for optimal static generation
export const dynamic = "force-static";
export const revalidate = 600;
export const dynamicParams = false; // Only allow pre-generated paths

interface BlogDetailPageProps {
    params: {
        slug: string;
    };
}

/**
 * Generates static paths for all blog posts at build time
 * This enables static site generation (SSG) for better performance
 */
export async function generateStaticParams() {
    try {
        const posts = await getAllPosts();
        const params = posts?.map(post => ({ slug: post.slug })) ?? [];
        console.log('Generated static params for blog posts:', params.length);
        return params;
    } catch (error) {
        console.error('Error generating static params for blog posts:', error);
        return [];
    }
}

/**
 * Generates SEO metadata for each blog post
 * Includes Open Graph tags for better social media sharing
 */
export async function generateMetadata({ params }: BlogDetailPageProps) {
    // Using await for params to ensure it's properly resolved before accessing properties
    const { slug } = await params;

    try {
        const seoData = await getSEOBySlug(slug, 'post', [slug]);

        // Generate metadata from SEO data
        return generateMetadataFromSEO(
            seoData.seoData,
            seoData.generalSettings,
            `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
            'post'
        );
    } catch (error) {
        return await generateNotFoundMetadata(
            'Blog Post',
            `${process.env.NEXT_PUBLIC_SITE_URL}`,
            undefined,
            'Oops! The page you were looking for does not exist.'
        );
    }
}




/**
 * Builds the full URL for a blog post
 * @param slug - The blog post slug
 */
const getBlogUrl = (slug: string): string => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://optigrid.energy";
    return `${baseUrl}/blog/${slug}`;
};

const BlogDetailPage = async ({ params }: BlogDetailPageProps) => {
    // Ensure params is properly resolved for static generation
    const { slug } = await params;

    let post;

    try {
        post = await getPostBySlug(slug);

        // Check if post exists and is published
        if (!post || post.status !== 'publish') {
            console.log('Post not found or not published:', { slug, post: post?.status });
            notFound();
        }
    } catch (error) {
        console.log('Error fetching post:', error);
        notFound();
    }

    // If we reach here, post exists and is valid
    const currentUrl = getBlogUrl(post.slug);

    return (
        <div className="bg-foundation-color min-h-screen">
            <div className="container mx-auto pt-24">
                <Breadcrumb
                    items={[
                        { label: "News & Insights", href: "/blog" },
                        { label: post.title },
                    ]}
                />

                {/* Featured image banner */}
                {post.featuredImage?.node?.sourceUrl && (
                    <div className="flex justify-center mb-5 w-full lg:mb-10">
                        <div className="relative inline-block rounded-lg overflow-hidden bg-gray-800">
                            <Image
                                src={post.featuredImage.node.sourceUrl}
                                alt={post.title}
                                width={0}
                                height={0}
                                className="max-w-full h-auto"
                                style={{ width: 'auto', height: 'auto' }}
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                            />
                        </div>
                    </div>
                )}

                {/* Main content area with flexbox layout */}
                <div className="flex flex-col gap-6 lg:flex-row">
                    {/* Left column - Header and Content */}
                    <div className="flex-1">
                        {/* Header section */}
                        <header className="mb-8">
                            <h1 className="mb-6 text-2xl leading-tight font-bold text-white lg:text-4xl">
                                {post.title}
                            </h1>
                            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                <BlogMetadata post={transformWordPressPost(post)} />
                            </div>
                        </header>

                        {/* Content section */}
                        <div className="mb-8">
                            {post.content && <BlogContent content={post.content} />}
                        </div>
                    </div>

                    {/* Right column - Sidebar */}
                    <div className="w-[20%] items-center justify-center">
                        <BlogSidebar
                            content={post.content}
                            title={post.title}
                            url={currentUrl}
                        />
                    </div>
                </div>

                {post.relatedPosts?.length && (
                    <RelatedArticles articles={transformWordPressRelatedPosts(post.relatedPosts)} />
                )}
            </div>
        </div>
    );

};

export default BlogDetailPage;
