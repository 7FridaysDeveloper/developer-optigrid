"use client";

// import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import ContentSection from "./Section";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRODUCTS } from "@/constants/consts";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

export default function Products() {
  // const sectionRef = useRef<HTMLDivElement>(null); // section that controls ScrollTrigger
  // const stackRef = useRef<HTMLDivElement>(null); // wrapper we pin

  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     const cards = gsap.utils.toArray<HTMLElement>(".stack-card");

  //     /* ------------------------------------------------------------------
  //      * INITIAL STATE
  //      * ------------------------------------------------------------------*/
  //     cards.forEach((card, i) => {
  //       gsap.set(card, {
  //         zIndex: i, // later cards will naturally sit on top
  //         ...(i > 0 && {
  //           // every card except the first starts below & hidden
  //           yPercent: 100,
  //           autoAlpha: 0,
  //           scale: 0.96,
  //         }),
  //       });
  //     });

  //     /* ------------------------------------------------------------------
  //      * TIMELINE
  //      * ------------------------------------------------------------------*/
  //     const tl = gsap.timeline({
  //       defaults: { ease: "power1.out" },
  //       scrollTrigger: {
  //         trigger: sectionRef.current,
  //         start: "top top",
  //         end: () => `+=${(cards.length - 1) * window.innerHeight}`,
  //         pin: sectionRef.current, // Pin the entire section, not just the stack
  //         pinSpacing: true, // Let GSAP handle spacing to prevent overlap
  //         scrub: 0.25, // Smooth scrolling animation
  //         anticipatePin: 1,
  //       },
  //     });

  //     cards.forEach((card, i) => {
  //       if (i === 0) return; // skip first

  //       const prev = cards[i - 1];

  //       // bring current card to the very top layer **before** animating it in
  //       tl.set(card, { zIndex: cards.length + i });

  //       // Push previous card up, fade slightly (stays visible underneath)
  //       tl.to(prev, {
  //         yPercent: -10,
  //         scale: 0.9,
  //         autoAlpha: 0.45,
  //         duration: 0.35,
  //       });

  //       // Slide current card from below to front/center
  //       tl.to(
  //         card,
  //         {
  //           yPercent: 0,
  //           autoAlpha: 1,
  //           scale: 1,
  //           duration: 0.35,
  //         },
  //         "<",
  //       ); // Run simultaneously for seamless swap
  //     });
  //   }, sectionRef);

  //   return () => ctx.revert();
  // }, []);

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
        badgeText="Product"
        heading="Smarter Electricity Trading Starts Here"
        id="products-section"
      >
        {/* STACK (PINNED) -------------------------------------------------- */}
        {/* <div
          ref={stackRef}
          className="relative" // Set height to match viewport for proper pinning
        > */}
        {PRODUCTS.map((p, idx) => (
          <Card
            key={idx}
            className={`mx-auto mt-10 w-full ${p.bgClass} rounded-2xl border-0 text-white will-change-transform md:py-0`}
          >
            <CardContent className="rounded-lg bg-[#142130] md:px-6 md:py-6 xl:px-10 xl:py-12">
              <div className="grid gap-0 md:grid-cols-2 md:gap-4">
                {/* TEXT SIDE */}
                <div className="flex flex-col justify-center space-y-6 text-left">
                  <h4 className="text-xl font-bold md:text-2xl lg:text-3xl">
                    {p.title}
                  </h4>
                  <p className="leading-relaxed whitespace-pre-line text-gray-300">
                    {p.description}
                  </p>
                  <Link
                    href={p.link}
                    className="text-foundation-light-normal hover:text-foundation-light-light-active inline-flex items-center transition-colors"
                  >
                    <span className="mr-2">Learn more</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>

                {/* MEDIA SIDE */}
                <div className="relative flex h-64 items-center justify-center rounded-xl bg-[#FFFFFF14] p-2 md:h-auto">
                  {p.image && (
                    <Image
                      src={p.image}
                      alt={p.title}
                      // fill
                      // sizes="(min-width: 768px) 50vw, 80vw"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="size-full rounded-lg object-contain"
                      priority={idx === 0}
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {/* </div> */}
      </ContentSection>
    </motion.div>
  );
}
