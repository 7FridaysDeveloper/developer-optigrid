"use client";
import { Badge } from "./ui/badge";
import Image from "next/image";
import FeatureCard from "./FeatureCard";
import AnimatedBeamMultipleInputs from "./ui/animated-beam-multiple-inputs";
import EnergyComparisonCard from "./EnergyComparisonCard";
import { motion } from "framer-motion";

// Configuration for the feature cards displayed in the grid.
// Moved outside the component to prevent re-creation on every render.
const features = [
  {
    title: "Flexible Platform",
    description: "Tailored to your asset and strategy needs",
    icon: "/icons/cube.svg",
    image: (
      <div className="relative h-[180px] w-full overflow-hidden">
        <Image
          src="/features/flexible.svg"
          alt="Flexible Platform"
          width={0}
          height={0}
          className="h-full w-full object-cover"
        />
        {/* Gradient overlay from transparent to dark at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-800/60 via-transparent to-transparent"></div>
      </div>
    ),
    className: "md:col-span-1 md:row-span-1 gap-4",
    contentClassName: "p-6",
  },

  {
    title: "Intelligent Trading Strategies",
    description: "Algorithms that capture maximum value",
    icon: "/icons/battery-electric.svg",
    image: (
      <div className="relative h-[180px] w-full rounded-lg">
        {/* Background bars representing different bidding strategies */}
        <div className="inset-0 flex w-full flex-col items-end justify-end space-y-2.5">
          {/* Strategy 1 - Short bar */}
          {/* #20344B */}
          <div className="flex w-[60%] items-end space-x-2 rounded-lg bg-gradient-to-r from-[#1F334B] to-[#142130]">
            <div className="relative flex h-8 max-w-1/2 flex-1 items-center rounded-tl-lg rounded-bl-lg bg-[#20344B] pl-2">
              <div className="absolute top-0.5 left-1 h-4 w-3">📁</div>
              <div className="ml-5 text-xs text-[#9FB0BF]">Strategy 1</div>
            </div>
          </div>

          {/* Strategy 2 - Medium bar */}
          <div className="flex w-[70%] items-end space-x-2 rounded-lg bg-gradient-to-r from-[#1F334B] to-[#142130]">
            <div className="relative flex h-8 max-w-10/12 flex-1 items-center rounded-tl-lg rounded-bl-lg bg-[#20344B] pl-2">
              <div className="absolute top-0.5 left-1 h-4 w-3">💡</div>
              <div className="ml-5 text-xs text-[#9FB0BF]">Strategy 2</div>
            </div>
          </div>

          {/* Strategy 3 - Long bar (optimal) */}
          <div className="flex w-[50%] items-end space-x-2 rounded-lg bg-gradient-to-r from-[#1F334B] to-[#142130]">
            <div className="relative flex h-8 max-w-1/2 flex-1 items-center rounded-tl-lg rounded-bl-lg bg-[#20344B] pl-2">
              <div className="absolute top-0.5 left-1 h-4 w-3">☁️</div>
              <div className="ml-5 text-xs text-[#9FB0BF]">Strategy 3</div>
            </div>
          </div>

          {/* Strategy 4 - Medium-short bar */}
          <div className="flex w-[90%] items-end space-x-2 rounded-lg bg-gradient-to-r from-[#1F334B] to-[#142130]">
            <div className="relative flex h-8 max-w-1/3 flex-1 items-center rounded-tl-lg rounded-bl-lg bg-[#20344B] pl-2">
              <div className="absolute top-0.5 left-1 h-4 w-4">⚡</div>
              <div className="ml-5 text-xs text-[#9FB0BF]">Strategy 4</div>
            </div>
          </div>
        </div>

        {/* Connecting lines to simulate data flow
        <div className="absolute top-1/2 right-0 -translate-y-1/2 transform">
          <div className="h-px w-8 bg-gradient-to-r from-[#1F334B] to-transparent"></div>
        </div> */}
      </div>
    ),
    className: "md:col-span-1 md:row-span-1 gap-4",
    contentClassName: "p-6",
    backgroundClassName: "pt-6",
  },
  {
    title: "Market Integration & Asset Control",
    description: "Automated control and bidding for assets across all markets",
    icon: "/icons/chart_bar.svg",
    image: <AnimatedBeamMultipleInputs />,
    className: "md:col-span-2 md:row-span-1 p-6 gap-4",
  },
];

/**
 * Renders the Features section of the homepage.
 * It includes a heading, a subheading, and a grid of feature cards.
 */
export default function Features() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      variants={{
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
      }}
      viewport={{ once: true }}
    >
      <section className="px-5 py-16 md:py-24">
        <div className="container mx-auto text-center">
          <div className="flex flex-col items-center">
            {/* Section Heading */}
            <Badge className="text-foundation-light-light-active border-foundation-light-dark rounded-full border-2 text-sm font-semibold">
              Features
            </Badge>
            <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl lg:text-3xl">
              Built to{" "}
              <span className="text-foundation-light-normal">
                Maximise Returns
              </span>{" "}
              from Batteries
            </h2>

            {/* Section Subheading */}
            <p className="text-foundation-light-light-active mx-auto mt-4 mb-16 max-w-3xl text-base">
              We combine cutting-edge tech with real-world experience to
              optimise operations and trading for
              <br /> battery and renewable assets of any size.
            </p>
          </div>

          {/* Features Grid Layout */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-2 lg:gap-8">
            <EnergyComparisonCard />

            {/* Renders feature cards by mapping over the features array */}
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
