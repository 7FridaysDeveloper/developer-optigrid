import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GetInTouch() {
  return (
    <section
      aria-labelledby="contact-heading"
      className="relative overflow-hidden px-4 py-16 text-center md:py-24"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 mx-auto w-1/2 bg-[#15283E] opacity-[32%] blur-[124.4px]" />
      </div>
      <div className="absolute inset-0 z-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              width: `${(i + 1) * 20}rem`,
              height: `${(i + 1) * 20}rem`,
            }}
            className="border-foundation-light-darker absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          />
        ))}
      </div>
      <div className="relative z-10">
        <h2
          id="contact-heading"
          className="mb-4 text-2xl font-bold text-white md:mb-6 md:text-3xl"
        >
          Ready to explore?
        </h2>
        <p className="mx-auto mb-6 max-w-xl text-sm text-white/80 md:mb-8 md:text-base">
          Explore real-time battery data and analytics. Sign up for free access
          or contact us to learn more about OptiGrid.
        </p>
        <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
          <Button
            className="bg-foundation-light-dark hover:bg-foundation-light-dark/80 cursor-pointer px-6 py-2 text-base shadow-xs transition-colors md:px-7 md:py-2.5 md:text-lg"
            size={"xl"}
            aria-label="Create a free account"
            asChild
          >
            <Link href="/2">Create Free Account</Link>
          </Button>
          <Button
            className="hover:bg-foundation-light-dark text-foundation-light-normal border-foundation-light-dark cursor-pointer border px-6 py-2 text-base shadow-xs transition-colors hover:text-white md:px-7 md:py-2.5 md:text-lg"
            size={"xl"}
            aria-label="Contact us to learn more"
            asChild
            variant={"ghost"}
          >
            <Link href="/contact-us">Contact us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
