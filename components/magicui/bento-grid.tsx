import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ComponentPropsWithoutRef, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon?: React.ElementType;
  description: string;
  href?: string; // Make href optional
  cta?: string; // Make cta optional
  showHoverEffects?: boolean; // Toggle hover effects
  textAlignment?: "left" | "center" | "right"; // Control text alignment
  titleColor?: string; // Custom title color
  descriptionColor?: string; // Custom description color
  backgroundClassName?: string; // Custom background class
  contentClassName?: string; // Custom content class
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  showHoverEffects = false, // Default to no hover effects
  textAlignment = "left", // Default to left alignment
  titleColor,
  descriptionColor,
  backgroundClassName: bgclass,
  contentClassName,
  ...props
}: BentoCardProps) => {
  // Helper function for text alignment classes
  const getTextAlignmentClass = () => {
    switch (textAlignment) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      default:
        return "text-left";
    }
  };

  const textAlignmentClass = getTextAlignmentClass();

  return (
    <div
      key={name}
      className={cn(
        "group relative col-span-3 flex max-h-[370px] flex-col justify-between overflow-hidden rounded-xl",
        // light styles
        "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "dark:bg-background transform-gpu dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]",
        className,
      )}
      {...props}
    >
      <div className={bgclass}>{background}</div>
      <div
        className={cn(
          contentClassName,
          "z-10 flex flex-col gap-1",
          textAlignmentClass,
          showHoverEffects &&
            "pointer-events-none transform-gpu transition-all duration-300 group-hover:-translate-y-10",
        )}
      >
        {Icon && (
          <Icon
            className={cn(
              "h-12 w-12",
              textAlignment === "left"
                ? "origin-left"
                : textAlignment === "right"
                  ? "origin-right"
                  : "mx-auto",
              showHoverEffects &&
                "transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75",
            )}
          />
        )}
        <h3
          className={cn(
            "text-xl font-semibold",
            titleColor || "text-neutral-700 dark:text-neutral-300",
          )}
        >
          {name}
        </h3>
        <p className={cn("max-w-lg", descriptionColor || "text-neutral-400")}>
          {description}
        </p>
      </div>

      {href && cta && showHoverEffects && (
        <>
          <div
            className={cn(
              "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
              textAlignment === "center" && "justify-center",
              textAlignment === "right" && "justify-end",
            )}
          >
            <Button
              variant="ghost"
              asChild
              size="sm"
              className="pointer-events-auto"
            >
              <a href={href}>
                {cta}
                <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
              </a>
            </Button>
          </div>
          <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
        </>
      )}
    </div>
  );
};

export { BentoCard, BentoGrid };
