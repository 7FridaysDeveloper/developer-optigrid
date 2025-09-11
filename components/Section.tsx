'use client'
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

// Utility function
const renderHeading = (
  heading: string,
  headingLevel: ContentSectionProps["headingLevel"] = "h2",
) => {
  const parts = heading.split(/(<span>.*?<\/span>)/g);
  const className =
    "mt-3 text-3xl leading-10 font-bold text-white md:text-3xl lg:text-4xl";

  // Create the heading content
  const headingContent = parts.map((part, index) => {
    if (part.startsWith("<span>") && part.endsWith("</span>")) {
      const content = part.replace(/<\/?span>/g, "");
      return (
        <span key={index} className="text-foundation-light-normal">
          {content}
        </span>
      );
    }
    return part;
  });

  // Render the appropriate heading element
  switch (headingLevel) {
    case "h1":
      return <h1 className={className}>{headingContent}</h1>;
    case "h2":
      return <h2 className={className}>{headingContent}</h2>;
    case "h3":
      return <h3 className={className}>{headingContent}</h3>;
    case "h4":
      return <h4 className={className}>{headingContent}</h4>;
    case "h5":
      return <h5 className={className}>{headingContent}</h5>;
    case "h6":
      return <h6 className={className}>{headingContent}</h6>;
    default:
      return <h2 className={className}>{headingContent}</h2>;
  }
};

export interface ContentSectionProps {
  children: React.ReactNode;
  badgeText?: string;
  heading?: string;
  headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  subheading?: string;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  align?: "left" | "center" | "right";
  maxWidth?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl";
  containerWidth?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  background?: "none" | "primary" | "secondary" | "accent";
  animation?: "none" | "fade-in" | "slide-up" | "slide-down";
  enableAnimation?: boolean;
  imageContent?: React.ReactNode;
  imagePosition?: "left" | "right";
  imageClass?: string;
  bgContainer?: React.ReactNode;
}

export default function ContentSection({
  children,
  badgeText,
  heading,
  headingLevel = "h2",
  subheading,
  className = "",
  id,
  style,
  align = "center",
  enableAnimation = false,
  imageContent,
  imagePosition = "right",
  imageClass = "",
  bgContainer,
}: ContentSectionProps) {
  const textAlignment = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  const contentOrder =
    imagePosition === "left" ? "md:flex-row-reverse" : "md:flex-row";

  // Default animation variants
  const defaultAnimationVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
      },
    },
  };

  const animationProps = enableAnimation
    ? {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        variants: defaultAnimationVariants,
        viewport: { once: true },
      }
    : {};

  if (imageContent) {
    const SectionComponent = enableAnimation ? motion.section : "section";
    return (
      <SectionComponent
        id={id}
        className={cn("relative py-16 md:py-24", className)}
        style={style}
        {...animationProps}
      >
        <div
          className={cn(
            "container mx-auto flex flex-col px-6 md:gap-x-12 xl:px-0",
            contentOrder,
          )}
        >
          {bgContainer && bgContainer}
          <div
            className={cn(
              "flex flex-col md:w-1/2",
              textAlignment[align],
              className,
            )}
          >
            {badgeText && (
              <Badge className="text-foundation-light-light-active border-foundation-light-dark rounded-full border-2 text-sm font-semibold">
                {badgeText}
              </Badge>
            )}

            {heading && renderHeading(heading, headingLevel)}

            {subheading && (
              <p className="text-foundation-light-light-active mx-auto mt-4 max-w-3xl text-base">
                {subheading}
              </p>
            )}
            {children}
          </div>
          <div
            className={cn(
              "mt-8 flex items-center justify-center md:mt-0 md:w-1/2",
              imageClass,
            )}
          >
            {imageContent}
          </div>
        </div>
      </SectionComponent>
    );
  }

  const SectionComponent = enableAnimation ? motion.section : "section";
  return (
    <SectionComponent
      id={id}
      className={cn("py-16 md:py-24", className)}
      style={style}
      {...animationProps}
    >
      <div className={cn("mx-auto max-w-6xl", textAlignment[align])}>
        <div className={cn("flex flex-col", textAlignment[align])}>
          {/* Section Heading */}
          {badgeText && (
            <Badge className="text-foundation-light-light-active border-foundation-light-darker rounded-full border-2 text-sm font-semibold">
              {badgeText}
            </Badge>
          )}

          {heading && renderHeading(heading, headingLevel)}

          {/* Section Subheading */}
          {subheading && (
            <p className="text-foundation-light-light-active mx-auto mt-4 mb-16 max-w-3xl text-base">
              {subheading}
            </p>
          )}

          {/* Children */}
          {children}
        </div>
      </div>
    </SectionComponent>
  );
}
