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
    const posts = await getAllPosts();
    // Generate static params for all blog posts at build time
    // This ensures all blog posts are statically generated for optimal performance
    return posts?.map(post => ({ slug: post.slug })) ?? [];
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
            `${process.env.NEXT_PUBLIC_SITE_URL}/blogs`
        );
    } catch (error) {
        return generateNotFoundMetadata('Blog Post', `${process.env.NEXT_PUBLIC_SITE_URL}/blogs`);
    }
}




/**
 * Builds the full URL for a blog post
 * @param slug - The blog post slug
 */
const getBlogUrl = (slug: string): string => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://optigrid.energy";
    return `${baseUrl}/blogs/${slug}`;
};

const BlogDetailPage = async ({ params }: BlogDetailPageProps) => {
    // Ensure params is properly resolved for static generation
    const { slug } = await params;

    try {
        const post = await getPostBySlug(slug);
        console.log(post)
        // Check if post is published, redirect to 404 if not
        if (!post || post.status !== 'publish') {
            notFound();
        }

        const currentUrl = getBlogUrl(post.slug);

        return (
            <div className="bg-foundation-color min-h-screen">
                <div className="container mx-auto pt-24">
                    <Breadcrumb
                        items={[
                            { label: "News & Insights", href: "/blogs" },
                            { label: post.title },
                        ]}
                    />

                    {/* Featured image banner */}
                    <div className="relative mb-5 h-64 w-full overflow-hidden rounded-lg md:h-96 lg:mb-10">
                        <Image
                            src={post.featuredImage?.node?.sourceUrl ?? ''}
                            alt={post.title}
                            fill
                            className="object-cover1"
                            priority
                        />
                    </div>

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
    } catch (error) {
        console.log('error component')
        notFound();
    }
};

export default BlogDetailPage;
