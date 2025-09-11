"use client";

import { TIMELINEDATA } from "@/constants/consts";
import React from "react";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";

/**
 * Renders a responsive timeline component that displays historical events.
 * On desktop, it shows an alternating left-right layout.
 * On mobile, it collapses into a single column.
 */
const Timeline = () => {
  return (
    <section className="relative mt-10 py-20">
      {/* Decorative background image with a gradient overlay */}
      <div className="bg-left-[-400px] absolute inset-0 bg-[url('/bg-opti.webp')] bg-cover bg-center opacity-25">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C151F] to-transparent" />
      </div>

      <div className="relative container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-white">
          Our History
        </h2>
        <div className="relative">
          {/* Vertical timeline bar for desktop and mobile */}
          <motion.div
            className="bg-foundation-light-dark-active absolute left-1/2 hidden h-full w-0.5 -translate-x-1/2 transform md:block"
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.div
            className="bg-foundation-light-dark-active absolute left-4 h-full w-0.5 md:hidden"
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {TIMELINEDATA.map((item, index) => (
            <motion.div
              key={index}
              className={`mb-8 flex w-full items-center ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
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
                    delay: 0.2 * (index % 3), // staggered delay based on index
                  },
                },
              }}
            >
              {/* Mobile view layout */}
              <motion.div
                className="block w-full md:hidden"
                variants={{
                  hidden: { opacity: 0, x: index % 2 === 0 ? -10 : 10 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.4, delay: 0.3 },
                  },
                }}
              >
                <div className="ml-10 flex flex-col gap-4 rounded-lg px-6 py-4">
                  <Badge className="border-foundation-light-dark text-foundation-light-light-active w-fit rounded-full border-2 text-sm font-semibold">
                    {item.year}
                  </Badge>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-pastel-sky-blue mt-2">
                    {item.description}
                  </p>
                </div>
              </motion.div>

              {/* Desktop view layout */}
              <motion.div
                className="hidden w-5/12 md:block"
                variants={{
                  hidden: { opacity: 0, x: index % 2 === 0 ? -20 : 20 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.5, delay: 0.3 },
                  },
                }}
              >
                <div className="flex flex-col items-start justify-end gap-4 rounded-lg px-6 py-4 text-left">
                  <Badge className="border-foundation-light-dark text-foundation-light-light-active w-fit rounded-full border-2 text-sm font-semibold">
                    {item.year}
                  </Badge>
                  <h3 className="text-2xl font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="text-md text-pastel-sky-blue">
                    {item.description}
                  </p>
                </div>
              </motion.div>

              {/* Timeline dot */}
              <motion.div
                className="bg-foundation-light-normal absolute left-4 z-20 flex h-8 w-8 -translate-x-1/2 transform items-center rounded-full shadow-xl md:left-1/2"
                variants={{
                  hidden: { scale: 0.5, opacity: 0 },
                  visible: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                      delay: 0.4,
                    },
                  },
                }}
                whileHover={{ scale: 1.25, transition: { duration: 0.3 } }}
              >
                <div className="bg-foundation-light-dark-hover mx-auto size-3 rounded-full" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
