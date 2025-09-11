"use client";
import React from "react";
import { BentoCard } from "@/components/magicui/bento-grid";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ChartAnimation from "./ChartAnimation";

interface EnergyComparisonCardProps {
  className?: string;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  isIcon?: boolean;
}

// Helper component for the card's background, featuring a chart animation.
const ChartBackground = () => (
  <div className="relative w-full pb-6">
    <ChartAnimation />
  </div>
);

// Helper component for the card's icon.
const IconComponent: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("mb-2", className)}>
    <Image
      src="/icons/chart_info.svg"
      alt="Chart Icon"
      width={40}
      height={40}
      className="h-10 w-10"
    />
  </div>
);

/**
 * Renders a specialized card for displaying energy comparison data.
 * This component uses the BentoCard layout to present a title, description,
 * and a dynamic chart animation in the background.
 */
export default function EnergyComparisonCard({
  className,
  title = "Higher Performance than Prevailing Solutions",
  description = "Smarter models, better decisions, stronger returns",
  icon,
  isIcon = true,
}: EnergyComparisonCardProps) {
  const IconToUse = icon ? () => <>{icon}</> : IconComponent;

  return (
    <BentoCard
      name={title}
      description={description}
      Icon={isIcon ? IconToUse : undefined}
      background={<ChartBackground />}
      showHoverEffects={false}
      titleColor="text-white"
      descriptionColor="text-foundation-light-light-active"
      className={cn(
        "bg-animate-color col-span-2 gap-4 p-6 md:col-span-2",
        className,
      )}
    />
  );
}
