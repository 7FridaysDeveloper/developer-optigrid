"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/types/blog";
import Image from "next/image";

interface BlogMetadataProps {
  post: BlogPost;
}

/**
 * Displays metadata for a blog post including date, read time, and tags
 * Implements a consistent styling for blog post metadata across the site
 */
export const BlogMetadata = ({ post }: BlogMetadataProps) => {
  const { date, readTime, author, tags } = post;

  return (
    <div className="space-y-4">
      <div className="text-foundation-gray-normal flex flex-wrap items-center gap-4 text-sm">
        {/* Author/category indicator */}
        {author && (
          <div className="text-foundation-gray-normal flex items-center gap-2 text-sm">
            <Image
              src="/icons/grid-interface.svg"
              alt="Author Icon"
              width={16}
              height={16}
              className="rounded-full"
            />
            <span>News</span>
          </div>
        )}
        {/* Publication date */}
        <span className="flex items-center gap-2">
          <Image
            src="/icons/calendar.svg"
            alt="Calendar Icon"
            width={16}
            height={16}
            className="h-4 w-4"
          />
          {new Date(date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>

        {/* Read time indicator */}
        {readTime && (
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            {readTime}
          </span>
        )}
      </div>

      {/* Tag badges */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-foundation-gray-normal bg-gray-800 hover:bg-gray-700"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
