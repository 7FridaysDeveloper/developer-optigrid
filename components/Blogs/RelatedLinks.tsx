"use client";

import { BlogPost, RelatedLink } from "@/types/blog";
import React from "react";
import BlogCard from "@/components/Blogs/BlogCard";

interface RelatedLinksProps {
  links: RelatedLink[];
}

export const RelatedLinks = ({ links }: RelatedLinksProps) => {
  // Transform RelatedLink objects to BlogPost format for BlogCard
  const transformedLinks = links.map(
    (link, index) =>
      ({
        title: link.title,
        excerpt: link.description || "",
        date: new Date().toLocaleDateString(), // Current date as fallback
        image: "/blogs/post-1.jpg", // Default image as fallback
        slug: link.url?.replace(/^\/blogs\//, "") || `related-link-${index}`,
        url: link.url || "",
      }) as BlogPost,
  );

  return (
    <div className="mt-8 rounded-lg bg-gray-900/50 p-6">
      <h3 className="mb-4 text-xl font-semibold text-white">On this page</h3>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {transformedLinks.map((post, index) => (
          <BlogCard key={index} post={post} />
        ))}
      </div>
    </div>
  );
};
