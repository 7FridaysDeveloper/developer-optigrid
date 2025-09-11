"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SocialShare } from "./SocialShare";

/**
 * Custom hook to detect viewport width below a breakpoint
 */
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const updateMatch = () => setMatches(media.matches);

    // Set initial value
    updateMatch();

    // Add listener for changes
    media.addEventListener("change", updateMatch);

    // Cleanup
    return () => media.removeEventListener("change", updateMatch);
  }, [query]);

  return matches;
};

interface BlogSidebarProps {
  content: React.ReactNode;
  title?: string;
  url?: string;
}

/**
 * BlogSidebar component with sticky positioning and animations
 * Displays social share and table of contents
 */
export const BlogSidebar = ({ title, url }: BlogSidebarProps) => {
  const [sidebarStyle, setSidebarStyle] = useState<React.CSSProperties>({});
  const sidebarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if viewport is below medium breakpoint (768px)
  const isMobile = useMediaQuery("(max-width: 767px)");

  // Motion scroll animations
  const { scrollYProgress } = useScroll();
  const sidebarOpacity = useTransform(scrollYProgress, [0, 0.05], [0.9, 1]);
  const sidebarScale = useTransform(scrollYProgress, [0, 0.05], [0.98, 1]);

  /**
   * Handles the sticky positioning of the sidebar when scrolling
   * Ensures the sidebar stops before overlapping the footer
   */
  const updateSidebarPosition = useCallback(() => {
    if (!sidebarRef.current || !containerRef.current) return;

    // Skip sticky positioning for mobile devices
    if (isMobile) {
      setSidebarStyle({
        position: "relative",
        top: "auto",
        width: "auto",
        zIndex: "auto",
        transform: "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      });
      return;
    }

    const sidebar = sidebarRef.current;
    const container = containerRef.current;
    const scrollTop = window.pageYOffset;
    const footer = document.getElementById("related-articles");

    if (!footer) return;

    const sidebarHeight = sidebar.getBoundingClientRect().height;
    const containerRect = container.getBoundingClientRect();
    const containerTop = containerRect.top + scrollTop;
    const footerTop = footer.getBoundingClientRect().top + scrollTop;

    // Configuration constants
    const headerOffset = 100; // Distance from top when sticky
    const footerOffset = 50; // Distance from footer to stop

    // Calculate boundary positions
    const startSticky = containerTop - headerOffset;
    const stopSticky = footerTop - sidebarHeight - footerOffset;

    // Apply appropriate positioning style based on scroll position
    if (scrollTop >= startSticky && scrollTop <= stopSticky) {
      // Fixed position while scrolling
      setSidebarStyle({
        position: "fixed",
        top: `${headerOffset}px`,
        width: "auto",
        zIndex: 10,
        transform: "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      });
    } else if (scrollTop > stopSticky) {
      // Stop at footer
      const offsetFromTop = stopSticky - scrollTop + headerOffset;
      setSidebarStyle({
        position: "fixed",
        top: `${offsetFromTop}px`,
        width: "auto",
        zIndex: 10,
        transform: "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      });
    } else {
      // Default position
      setSidebarStyle({
        position: "relative",
        top: "auto",
        width: "auto",
        zIndex: "auto",
        transform: "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      });
    }
  }, [isMobile]);

  useEffect(() => {
    // Skip for mobile devices
    if (isMobile) return;

    // Throttled scroll handler for better performance
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateSidebarPosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Register event listeners
    window.addEventListener("scroll", scrollListener);
    window.addEventListener("resize", updateSidebarPosition);

    // Initial position calculation
    updateSidebarPosition();

    // Cleanup event listeners
    return () => {
      window.removeEventListener("scroll", scrollListener);
      window.removeEventListener("resize", updateSidebarPosition);
    };
  }, [isMobile, updateSidebarPosition]); // Add isMobile as a dependency

  return (
    <div ref={containerRef} className="relative">
      <motion.div
        ref={sidebarRef}
        style={{
          ...(isMobile ? {} : sidebarStyle),
          opacity: sidebarOpacity,
          scale: sidebarScale,
        }}
        className={`${isMobile ? " " : "mt-1"} `}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Social Share section */}
        {title && url && (
          <motion.div
            className="flex items-center justify-center gap-4 rounded-full border border-gray-700/50 bg-gray-900/50 p-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <h3 className="text-sm font-semibold text-white">Share</h3>
            <SocialShare title={title} url={url} />
          </motion.div>
        )}

        {/* Table of contents section */}
        {/* <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <TableOfContents content={content} />
        </motion.div> */}
      </motion.div>
    </div>
  );
};
