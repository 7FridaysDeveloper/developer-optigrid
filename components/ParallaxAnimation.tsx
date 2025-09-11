"use client";

import { useEffect, useRef, useState } from "react";

interface ParallaxAnimationProps {
  imagePath: string;
  height?: string;
  overlayColor?: string;
  speed?: number; // Speed of parallax effect (1 = normal, 0.5 = half speed, 2 = double speed)
  className?: string;
}

function ParallaxAnimation({
  imagePath,
  height = "h-[467px]",
  overlayColor = "rgba(0,74,119,0.4)",
  speed = 0.5,
  className = "",
}: ParallaxAnimationProps) {
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if the element is in view
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate the parallax offset based on the element's position in the viewport
        const scrollPosition = window.scrollY;
        const elementTop = scrollPosition + rect.top;
        const distanceFromTop = scrollPosition - elementTop;
        const parallaxOffset = distanceFromTop * speed;

        setOffset(parallaxOffset);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${height} w-full ${className}`}
    >
      <div
        className="absolute inset-0 -top-[10%] h-[200%] w-full"
        style={{
          transform: `translateY(${offset}px)`,
          backgroundImage: `url('${imagePath}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          background: `linear-gradient(to top, ${overlayColor}, ${overlayColor})`,
        }}
      />
    </div>
  );
}

export default ParallaxAnimation;
