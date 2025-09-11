"use client";

import Image from "next/image";

interface AssetOptimizationCardProps {
  title: string;
  description: string;
  iconSrc: string;
}

const AssetOptimizationCard = ({
  title,
  description,
  iconSrc,
}: AssetOptimizationCardProps) => {
  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex w-full items-center justify-center gap-3">
        <div className="bg-foundation-light-darker flex size-8 flex-shrink-0 items-center justify-center rounded-lg">
          <Image
            src={iconSrc}
            width={24}
            height={24}
            alt={`${title} icon`}
            className="size-6"
          />
          {/* <span className="text-2xl text-blue-400">{icon}</span> */}
        </div>
        <div className="flex-1">
          <h3 className="text-sm leading-tight font-semibold text-white md:text-base">
            {title}
          </h3>
        </div>
      </div>
      <p className="text-foundation-light-light-active text-xs leading-relaxed md:text-sm">
        {description}
      </p>
    </div>
  );
};

const AssetOptimizationCards = () => {
  const optimizationSections = [
    {
      title: "Utility-Scale Batteries and Hybrids",
      description:
        "Optimising operation and trading for Scheduled batteries to maximise financial returns while ensuring compliance with contractual obligations and market rules.",
      iconSrc: "/icons/cpu-processor.svg",
    },
    {
      title: "Non-Scheduled Batteries and Hybrids (Sub-5MW)",
      description:
        "Dispatch optimisation and market participation for distribution-connected batteries, maximising energy arbitrage, FCAS revenue and other business objectives. Suitable for stand-alone and hybrid battery systems.",
      iconSrc: "/icons/two-hands.svg",
    },
    {
      title: "Renewable Plants",
      description:
        "Optimising operations and trading for solar and wind farms to maximise revenue across available markets and contracts, while minimising exposure to negative prices and FCAS costs.",
      iconSrc: "/icons/renewable.svg",
    },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="grid gap-6 md:gap-8">
        {optimizationSections.map((section, index) => (
          <AssetOptimizationCard
            key={index}
            title={section.title}
            description={section.description}
            iconSrc={section.iconSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default AssetOptimizationCards;
