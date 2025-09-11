"use client";

import { BlogPost } from "@/types/blog";
import React from "react";
import BlogCard from "@/components/Blogs/BlogCard";

interface RelatedArticlesProps {
  articles: BlogPost[];
}

export const RelatedArticles = ({ articles }: RelatedArticlesProps) => {
  return (
    <div className="mt-16" id="related-articles">
      <h2 className="mb-8 text-2xl font-bold text-white">Other articles</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <BlogCard key={article.slug} post={article} />
        ))}
      </div>
    </div>
  );
};
