"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative pt-16 text-white md:pt-32"
    >
      <div className="px-4 py-12 text-center">
        <motion.h1
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
          id="hero-heading"
          className="text-foundation-light-light mb-4 text-4xl leading-tight font-semibold md:text-5xl lg:text-[56px]"
        >
          Intelligent Energy Trading,
          <br className="hidden md:block" />
          Powered by Deep Tech
        </motion.h1>
        <motion.p
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
                delay: 0.4,
              },
            },
          }}
          viewport={{ once: true }}
          className="md:text-md text-foundation-light-light mx-auto mb-8 max-w-2xl pt-4 text-sm md:mb-12 md:pt-6"
        >
          We combine advanced data science with electricity market expertise to
          optimise
          <br /> trading for batteries and renewables, unlocking their full
          potential.
        </motion.p>
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
                delay: 0.6,
              },
            },
          }}
          viewport={{ once: true }}
        >
          <Link
            href="/contact-us"
            className="bg-foundation-light-dark hover:bg-foundation-light-dark/80 cursor-pointer rounded-md px-6 py-2 text-base md:px-7 md:py-2.5 md:text-lg"
            aria-label="Contact us to learn more"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
      <div
        className="gradient-bg bg-opacity-50 h-10 w-full"
        aria-hidden="true"
      ></div>
      <BackgroundBeams />
    </section>
  );
}
