"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface AdvantageCardProps {
  title: string;
  iconSrc: string;
  text?: string;
}

const AdvantageCard = ({ title, iconSrc, text }: AdvantageCardProps) => {
  return (
    <Card className="bg-foundation-dark-muted-blue border-foundation-light-darker group relative h-[340px] w-[352px] overflow-hidden rounded-2xl border">
      <CardContent className="relative z-10 flex flex-col items-start gap-8 px-6 py-10">
        <div className="bg-foundation-light-darker flex items-center justify-center rounded-lg transition-opacity duration-300 group-hover:opacity-0">
          <Image
            src={iconSrc}
            width={0}
            height={0}
            alt={`${title} icon`}
            className="size-full object-contain"
            sizes="100vw"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg leading-tight font-semibold text-white transition-opacity duration-300 group-hover:opacity-0 md:text-[28px]">
            {title}
          </h3>
          <p className="absolute top-[100px] right-6 left-6 text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
            {text}
          </p>
        </div>
      </CardContent>
      {/* Animated overlay that slides from bottom to top */}
      <div className="absolute right-0 bottom-0 left-0 h-0 bg-[#204257] transition-all duration-300 ease-in-out group-hover:h-full"></div>
    </Card>
  );
};

const AdvantageSection = () => {
  const advantages = [
    {
      title: "Increase battery and hybrid plant returns",
      iconSrc: "/logos/whiteLogo-LogoIcon.png",
      text: "OptiGrid leverages cutting-edge data science and machine learning tailored specifically for Australia's NEM, unlocking the full potential of batteries and renewable assets. Our platform continuously adapts and improves, delivering greater performance over time.",
    },
    {
      title: "Agnostic, independent platform",
      iconSrc: "/logos/whiteLogo-LogoIcon.png",
      text: "OptiGrid is designed to be agnostic and independent, seamlessly integrating with various battery and renewable energy systems. This flexibility ensures that our clients can maximize their investments without being locked into a single vendor.",
    },
    {
      title: "OptiGrid keeps on learning and improving",
      iconSrc: "/logos/whiteLogo-LogoIcon.png",
      text: "OptiGrid continuously learns from new data and user interactions, allowing it to adapt to changing market conditions and user needs. This commitment to improvement ensures that our clients always have access to the latest advancements in battery and renewable energy optimization.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true }}
      className="pt-16"
    >
      <div className="grid gap-6 md:grid-cols-3 md:gap-8">
        {advantages.map((advantage, index) => (
          <motion.div key={index} variants={cardVariants}>
            <AdvantageCard
              title={advantage.title}
              iconSrc={advantage.iconSrc}
              text={advantage.text}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default AdvantageSection;
