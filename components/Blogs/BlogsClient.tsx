"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/Blogs/BlogCard";
import type { BlogPost } from "@/types/blog";

const POSTS_PER_PAGE = 6;

interface BlogsClientProps {
    posts: BlogPost[];
}

export default function BlogsClient({ posts }: BlogsClientProps) {
    const [visiblePosts, setVisiblePosts] = useState(() => 6);

    // Guard against invalid posts array
    if (!posts || !Array.isArray(posts)) {
        return null;
    }

    const handleShowMore = () => {
        setVisiblePosts((prev) => Math.min(prev + POSTS_PER_PAGE, posts.length));
    };
    const hasMorePosts = visiblePosts < posts.length;

    return (
        <>
            {/* Blog Grid */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {posts.slice(0, visiblePosts).map((post, index) => (
                    <BlogCard key={`${post.slug}-${index}`} post={post} />
                ))}
            </div>

            {/* Show More Button */}
            {hasMorePosts && (
                <div className="mt-12 flex justify-center">
                    <Button
                        onClick={handleShowMore}
                        className="cursor-pointer rounded-md border border-gray-600 bg-transparent px-8 py-3 text-white transition-all duration-300 hover:bg-white hover:text-black"
                        variant="outline"
                    >
                        Show more
                    </Button>
                </div>
            )}

            {/* All posts loaded message */}
            {!hasMorePosts && posts.length > POSTS_PER_PAGE && (
                <div className="mt-12 text-center">
                    <p className="text-gray-400">All posts loaded</p>
                </div>
            )}
        </>
    );
};
