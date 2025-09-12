"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import ContentSection from "./Section";
import Link from "next/link";

/**
 * AboutSection component
 * Displays information about OptiGrid's energy asset optimization with a visual diagram
 */
export default function AboutSection() {
  // Prepare the diagram image with styling for the content section
  const imageContent = (
    <Card className="bg-animate-color w-full max-w-[455px] justify-start rounded-2xl border-0 py-0 shadow-lg">
      <CardContent className="flex flex-col items-center p-0">
        <Image
          src="/flow.webp"
          width={408}
          height={510}
          alt="OptiGrid Flow Diagram"
          className="rounded-lg"
          priority
        />
      </CardContent>
    </Card>
  );

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
      <ContentSection
        badgeText="About"
        heading="Optimising <span>Energy Assets</span> in Volatile Electricity Markets"
        align="left"
        imageContent={imageContent}
        imagePosition="left"
        className="justify-center py-20"
        imageClass="justify-start w-full"
      >
        <div className="mt-8 flex flex-col gap-6 md:gap-8">
          <p className="leading-7 text-gray-300">
            OptiGrid delivers cutting-edge asset optimisation and trading
            solutions tailored specifically to Australia&apos;s National
            Electricity Market. By using advanced numerical optimisation, AI,
            and machine learning, our platform helps you navigate market
            volatility, optimise asset performance, and maximise your financial
            returns.
          </p>

          <Link
            href="/about-us"
            className="text-foundation-light-normal flex cursor-pointer items-center justify-start !pl-0 font-semibold"
            aria-label="Learn more about OptiGrid"
          >
            Learn more <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </ContentSection>
    </motion.div>
  );
}
