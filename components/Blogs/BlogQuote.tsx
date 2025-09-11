"use client";

import React from "react";

interface BlogQuoteProps {
  quote: string;
}

export const BlogQuote = ({ quote }: BlogQuoteProps) => {
  return (
    <div className="border-foundation-light-darker my-8t rounded-r-lg border-l-4 pl-6 lg:pl-8">
      <blockquote className="text-foundation-light-light-active text-lg leading-relaxed italic">
        &ldquo;{quote}&rdquo;
      </blockquote>
    </div>
  );
};
