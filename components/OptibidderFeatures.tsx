'use client'
import { Badge } from "./ui/badge";
import Image from "next/image";
import FeatureCard from "./FeatureCard";
import EnergyComparisonCard from "./EnergyComparisonCard";
import { motion } from "framer-motion";

// Configuration for the feature cards displayed in the grid.
// Moved outside the component to prevent re-creation on every render.
const features = [
  {
    title: "Contract Management",
    description:
      "Tailored handling of tolling agreements, firm offtakes, PPAs, and other contractual positions, supported by our modelling capabilities.",

    image: (
      <div className="flex justify-end">
        <Image
          src="/features/contract.svg"
          alt="Flexible Platform"
          width={0}
          height={0}
          sizes="100vw"
          className="h-full w-full object-contain pt-4"
        />
      </div>
    ),
    className: "md:col-span-2 md:row-span-1 gap-4",
    contentClassName: "p-6",
  },

  {
    title: "Easy Integration",
    description:
      "Cloud APIs and hardware interfaces for asset integration and direct market access for bidding.",
    image: (
      <div className="flex justify-center">
        <Image
          src="/features/integration.svg"
          alt="Easy Integration"
          width={0}
          height={0}
          sizes="100vw"
          className="h-full w-[80%] object-contain"
        />
      </div>
    ),
    className: "md:col-span-2 md:row-span-1 gap-4",
    contentClassName: "p-6",
    backgroundClassName: "pt-6",
  },
  {
    title: "Full Market Coverage",
    description:
      "Optimised bidding and operations across wholesale energy and FCAS markets.",
    image: (
      <div className="flex justify-center">
        <div className="h-[157px] w-[70%] rounded-tl-lg rounded-bl-lg bg-[#2D3E53]" />
        <div className="h-[157px] w-[30%] bg-[#2D3053]" />
        <div className="h-[157px] w-[20%] bg-[#2D534D]" />
        <div className="h-[157px] w-[15%] rounded-tr-lg rounded-br-lg bg-[#223247]" />
      </div>
    ),
    className: "md:col-span-2 md:row-span-1 p-6 gap-4",
  },
  {
    title: "Advanced Simulation",
    description:
      "Accurate backtesting and live simulations for reliable insights and safe evaluation prior to deployment.",
    image: (
      //render image sim-chart.svg
      <div className="flex justify-center">
        <Image
          src="/features/sim-chart.svg"
          alt="Advanced Simulation"
          width={0}
          height={0}
          sizes="100vw"
          className="h-full w-[80%] object-contain"
        />
      </div>
    ),
    className: "md:col-span-2 md:row-span-1 p-6 gap-4",
  },
  // {
  //   title: "Uncertainty Modelling",
  //   description: "Designed for volatile markets",
  //   icon: "/icons/chart_bar.svg",
  //   image: <AnimatedBeamMultipleInputs />,
  //   className: "md:col-span-2 md:row-span-1 p-6 gap-4",
  // },
];

/**
 * Renders the Features section of the homepage.
 * It includes a heading, a subheading, and a grid of feature cards.
 */
export default function OptibidderFeatures() {
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
              How OptiGrid addresses your needs
            </h2>

            {/* Section Subheading */}
            <p className="text-foundation-light-light-active mx-auto mt-4 mb-16 max-w-3xl text-base">
              We deliver a complete solution designed to seamlessly integrate
              your assets and maximise returns across all markets and contracts.
              Our capabilities include:
            </p>
          </div>

          {/* Features Grid Layout */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-6 md:grid-rows-2 lg:gap-8">
            <EnergyComparisonCard
              title="Progressive Technology"
              isIcon={false}
              description="Leveraging state-of-the-art AI and machine learning for maximum value generation."
              className="bg-animate-color col-span-4 gap-4 p-6 md:col-span-4"
            />

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
