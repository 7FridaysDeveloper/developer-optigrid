"use client";

import { ArrowUpIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

export const ScrollToTop = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowScrollTop(scrollPosition > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showScrollTop) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: showScrollTop ? 1 : 0,
        scale: showScrollTop ? 1 : 0.8,
        y: showScrollTop ? 0 : 20,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      onClick={scrollToTop}
      className="bg-foundation-light-normal fixed right-6 bottom-6 z-50 cursor-pointer rounded-full p-3 text-white shadow-lg transition-transform duration-150 ease-in-out hover:scale-110 focus:outline-none"
      aria-label="Scroll to top"
      style={{ visibility: showScrollTop ? "visible" : "hidden" }}
    >
      <ArrowUpIcon className="h-6 w-6" />
    </motion.button>
  );
};
