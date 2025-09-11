"use client";

import { STATS_DATA } from "@/constants/consts";
import Counter from "./Counter";
import { motion } from "framer-motion";

const Stats = () => {
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
      <section
        className="bg-foundation-light-darker"
        aria-labelledby="stats-heading"
      >
        <div className="container mx-auto py-5 lg:py-10">
          <dl className="grid grid-cols-1 gap-3 text-center sm:grid-cols-3 lg:gap-0">
            {STATS_DATA.map((stat) => (
              <div key={stat.id} className="flex flex-col gap-3">
                <dt className="text-4xl leading-12 font-semibold text-white">
                  <Counter
                    value={stat.value}
                    unit={stat.unit}
                    startVal={stat.startVal}
                    prefix={stat.prefix}
                  />
                </dt>
                <dd className="text-foundation-light-light-active text-lg leading-7 font-normal">
                  {stat.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </motion.div>
  );
};

export default Stats;
