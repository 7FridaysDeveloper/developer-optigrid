"use client";

import { CUSTOMERS } from "@/constants/consts";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const TrustedByPartners = () => {
  return (
    <section
      className="bg-foundation-color mx-auto max-w-5xl px-4 py-8 text-center"
      aria-labelledby="trusted-by-heading"
    >
      <motion.h2
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
              delay: 0.8,
            },
          },
        }}
        viewport={{ once: true }}
        id="trusted-by-heading"
        className="text-md mb-6 font-medium text-white"
      >
        Trusted by
      </motion.h2>

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
              delay: 0.9,
            },
          },
        }}
        viewport={{ once: true }}
        className="mt-4 flex flex-wrap justify-center gap-8 md:gap-16"
        role="list"
        aria-label="Trusted partners and clients"
      >
        {CUSTOMERS.map((partner, index) => (
          <Link
            key={`${partner.name}-${index}`}
            href={partner.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-animate-color flex cursor-pointer items-center justify-center rounded-lg px-3 py-2 transition-all duration-300"
            role="listitem"
          >
            {/* Desktop Image */}
            <Image
              src={partner.desktopImage}
              alt={`${partner.name} logo`}
              className="hidden h-14 w-auto grayscale filter transition-all duration-300 hover:filter-none md:block"
              width={partner.width}
              height={partner.height}
              priority={index < 3} // Prioritize first 3 images for better LCP
            />

            {/* Mobile Image */}
            {partner.mobileImage && (
              <Image
                src={partner.mobileImage}
                alt={`${partner.name} logo`}
                className="block h-14 w-auto md:hidden"
                width={partner.mobileWidth || partner.width}
                height={partner.mobileHeight || partner.height}
                priority={index < 3}
              />
            )}
          </Link>
        ))}
      </motion.div>
    </section>
  );
};

export default TrustedByPartners;
