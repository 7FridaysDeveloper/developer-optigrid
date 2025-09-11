"use client";

import { PARTNERS } from "@/constants/consts";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Partners() {
  return (
    <motion.div
      initial="hidden"
      className="container px-5 md:px-0"
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
      <section
        aria-labelledby="partners-heading"
        className="bg-foundation-light-light-active my-12 flex flex-col items-center justify-center gap-8 rounded-xl px-6 py-7 lg:flex-row lg:justify-between lg:gap-6 xl:mx-auto xl:gap-14"
      >
        <h2
          id="partners-heading"
          className="text-foundation-light-darker text-center text-lg font-semibold lg:text-left lg:text-xl xl:text-2xl"
        >
          Our Partners <br />
          and Supporters
        </h2>
        <div
          className="flex flex-wrap items-center justify-center gap-6 lg:gap-6 xl:gap-14"
          role="list"
          aria-label="Partner logos"
        >
          {PARTNERS.map((partner, index) => (
            <div key={index} className="relative" role="listitem">
              <Image
                src={partner.src}
                className="object-contain"
                alt={partner.alt}
                width={partner.width}
                height={partner.height}
              />
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
