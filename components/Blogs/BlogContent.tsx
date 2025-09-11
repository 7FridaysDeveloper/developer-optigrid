"use client";

import React from "react";

interface BlogContentProps {
  content: React.ReactNode;
}

export const BlogContent = ({ content }: BlogContentProps) => {
  if (!content) return null;

  // If content is HTML string, render it with dangerouslySetInnerHTML
  if (typeof content === "string") {
    // Process the HTML content to insert section anchors at appropriate positions
    let processedContent = content;

    // Find paragraph breaks and insert section anchors at strategic points
    const sections = [
      { id: "introduction", position: 0 },
      { id: "key-insights", position: 0.25 },
      { id: "analysis", position: 0.5 },
      { id: "conclusion", position: 0.75 },
    ];

    // Split content by paragraphs to determine insertion points
    const paragraphs = content.split(/<\/p>/gi);
    const totalParagraphs = paragraphs.length;

    sections.forEach((section) => {
      const insertPosition = Math.floor(totalParagraphs * section.position);
      if (insertPosition < paragraphs.length) {
        const anchorHtml = `<div id="${section.id}" class="scroll-mt-20"></div>`;
        paragraphs[insertPosition] =
          paragraphs[insertPosition] + "</p>" + anchorHtml;
      }
    });

    processedContent = paragraphs.join("");

    return (
      <div className="prose prose-lg prose-invert max-w-none">
        <div
          className="text-foundation-light-light-active leading-relaxed lg:text-lg"
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />
      </div>
    );
  }

  // If content is React.ReactNode, render it directly
  return (
    <div className="prose prose-lg prose-invert max-w-none">
      {/* Section anchors for table of contents */}
      <div id="introduction" className="scroll-mt-20" />
      <div id="key-insights" className="scroll-mt-20" />
      <div id="analysis" className="scroll-mt-20" />
      <div id="conclusion" className="scroll-mt-20" />

      <div className="text-foundation-light-light-active leading-relaxed lg:text-lg">
        {content}
      </div>
    </div>
  );
};
