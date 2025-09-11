"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface TableOfContentsProps {
  content: React.ReactNode;
}

interface TocItem {
  id: string;
  title: string;
  level: number;
}

export const TableOfContents = ({ content }: TableOfContentsProps) => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Framer Motion scroll progress
  const { scrollYProgress } = useScroll();

  // Transform scroll progress to different animation values
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0.8, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [0.95, 1]);
  const y = useTransform(scrollYProgress, [0, 0.1], [10, 0]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    // Extract headings from HTML content
    if (!content) return;

    let textContent = "";

    // Convert React.ReactNode to string for processing
    if (typeof content === "string") {
      textContent = content;
    } else {
      // For HTML content, we'll create a simplified approach
      // Since content is HTML, we'll extract text from it
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = String(content);
      textContent = tempDiv.textContent || tempDiv.innerText || "";
    }

    // Split content into sections based on paragraphs
    const paragraphs = textContent
      .trim()
      .split(/\n\s*\n/)
      .filter((p) => p.trim());

    const items: TocItem[] = [];

    // Create meaningful table of contents items based on content structure
    if (paragraphs.length > 0) {
      items.push({
        id: "introduction",
        title: "Introduction",
        level: 1,
      });
    }

    if (paragraphs.length > 2) {
      items.push({
        id: "key-insights",
        title: "Key Insights",
        level: 1,
      });
    }

    if (paragraphs.length > 4) {
      items.push({
        id: "analysis",
        title: "Analysis",
        level: 1,
      });
    }

    if (paragraphs.length > 6) {
      items.push({
        id: "conclusion",
        title: "Conclusion",
        level: 1,
      });
    }

    setTocItems(items);
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = tocItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const scrollTop = window.scrollY + 120; // Offset for fixed header and some buffer

      // Find the current section
      let currentSection = "";
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (section.element) {
          const sectionTop = section.element.offsetTop;
          const sectionBottom =
            i < sections.length - 1 && sections[i + 1].element
              ? sections[i + 1].element!.offsetTop
              : document.body.scrollHeight;

          if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
            currentSection = section.id;
            break;
          }
        }
      }

      if (currentSection) {
        setActiveId(currentSection);
      }
    };

    // Add scroll listener with throttling
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", scrollListener);
  }, [tocItems]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Offset for fixed header
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (tocItems.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg p-6"
      style={{ opacity, scale, y }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h3
        className="mb-4 text-lg font-semibold text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        On this page
      </motion.h3>
      <nav>
        <ul className="space-y-2">
          {/* Progress bar based on scroll */}
          <motion.div
            className="to-foundation-color absolute h-1 w-0.5 rounded-t-lg bg-gradient-to-r from-blue-500"
            style={{
              height: progressWidth,
            }}
          />
          {tocItems.map((item, index) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.3 + index * 0.1,
                duration: 0.4,
                ease: "easeOut",
              }}
            >
              <motion.button
                onClick={() => scrollToSection(item.id)}
                className={`relative block w-full text-left text-sm transition-colors hover:text-white ${
                  activeId === item.id
                    ? "font-medium text-blue-400"
                    : "text-gray-400"
                } ${item.level > 1 ? "pl-4" : ""}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                {/* Active indicator */}
                {/* {activeId === item.id && (
                  <motion.div
                    className="absolute top-1/2 left-0 h-4 w-1 rounded-full bg-blue-400"
                    layoutId="activeIndicator"
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ transform: "translateY(-50%)" }}
                  />
                )} */}
                <span className="ml-3">{item.title}</span>
              </motion.button>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
};
