"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LeadershipMember } from "@/types/shared";
import { LEADERS } from "@/constants/consts";

const LeadershipCard = ({ member }: { member: LeadershipMember }) => {
  return (
    <motion.div
      className="group w-full cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -5 }}
    >
      {/* Leader Image Container */}
      <div className="relative mb-4 h-[280px] w-full overflow-hidden rounded-2xl">
        <Image
          src={member.imageSrc}
          alt={member.name}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-105"
        />

        {/* Background overlay that appears on hover - covers entire image */}
        <div className="bg-foundation-light-dark-active absolute inset-0 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-90" />

        {/* Description text that appears on hover - centered on image */}
        <div className="absolute inset-0 flex items-center justify-center p-6 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <p className="text-left text-sm leading-relaxed text-white">
            {member.description}
          </p>
        </div>
      </div>

      {/* Name and Position - Always visible below image */}
      <div className="text-left">
        <h3 className="mb-1 text-xl leading-tight font-semibold text-white">
          {member.name}
        </h3>
        <p className="text-foundation-light-light-active text-lg font-normal">
          {member.position}
        </p>
      </div>
    </motion.div>
  );
};

const Leadership = () => {
  return (
    <section className="bg-foundation-color py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-left"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-2xl font-bold text-white md:text-4xl">
            OptiGrid Leadership
          </h2>
        </motion.div>

        {/* Leadership Grid */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LEADERS.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="w-full"
            >
              <LeadershipCard member={member} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Leadership;
