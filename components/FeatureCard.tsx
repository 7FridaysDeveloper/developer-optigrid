import React from "react";
import Image from "next/image";
import { BentoCard } from "@/components/magicui/bento-grid";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: string;
  image: React.ReactNode;
  className?: string;
  href?: string;
  cta?: string;
  contentClassName?: string;
  backgroundClassName?: string;
}

export default function FeatureCard({
  title,
  description,
  icon,
  image,
  className = "",
  href = "#",
  contentClassName = "",
  backgroundClassName = "",
}: FeatureCardProps) {
  const IconComponent = ({ className }: { className?: string }) =>
    icon ? (
      <div className={className}>
        <Image src={icon} alt={title} width={40} height={40} className="" />
      </div>
    ) : null;

  return (
    <BentoCard
      name={title}
      description={description}
      Icon={icon ? IconComponent : undefined}
      background={image}
      href={href}
      textAlignment="left"
      showHoverEffects={false}
      titleColor="text-white"
      descriptionColor="text-foundation-light-light-active"
      className={cn("bg-animate-color", className)}
      contentClassName={contentClassName}
      backgroundClassName={backgroundClassName}
    />
  );
}
