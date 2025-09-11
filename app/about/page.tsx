"use client";
import GetInTouch from "@/components/GetInTouch";
import Leadership from "@/components/Leadership";
import Partners from "@/components/Partners";
import ContentSection from "@/components/Section";
import Timeline from "@/components/Timeline";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-foundation-color">
      <ContentSection
        badgeText="About us"
        heading="We are driven to build an <span>efficient renewable grid.</span>"
        imagePosition="right"
        align="left"
        className="justify-center"
        imageContent={
          <div className="flex h-[366px] w-[450px] items-center justify-center rounded-lg bg-gray-800">
            {/* TODO: Add image here */}
            <Image
              src="/aboutLogo.svg"
              alt="About us"
              width={450}
              height={366}
              className="size-full rounded-lg object-contain"
            />
          </div>
        }
      >
        <div className="text-left">
          <p className="mt-4 text-lg text-gray-300">
            At OptiGrid, we believe the energy transition depends not just on
            adding more renewables and batteries, but on using them smarter. We
            partner with electricity retailers, asset developers and operators
            to unlock the full potential of battery and renewable assets.
          </p>
          <p className="mt-4 text-lg text-gray-300">
            By optimising their performance and market participation, our
            technology helps maximise returns while improving grid efficiency.
            Backed by our world-leading research, we&apos;re bringing
            cutting-edge data science into the energy industry to accelerate the
            transition and realise the full value of clean energy assets.
          </p>
          <Button
            asChild
            className="bg-foundation-light-dark hover:bg-foundation-light-dark/80 mt-8 cursor-pointer px-6 py-2 text-base md:px-7 md:py-2.5 md:text-lg"
            size={"xl"}
            aria-label="Contact us to learn more"
          >
            <Link href="/contact-us">Contact us</Link>
          </Button>
        </div>
      </ContentSection>
      <Partners />
      <Timeline />
      <Leadership />
      <ContentSection
        heading="Born in South Australia: Home to the world’s leading renewable energy grid"
        imagePosition="right"
        align="left"
        imageContent={
          <div className="bg-animate-color flex h-[355px] w-[550px] justify-center rounded-lg">
            <Image
              src="/about/renewable.png"
              alt="Renewable Energy"
              width={328}
              height={310}
              className="rounded-lg"
            />
          </div>
        }
      >
        <div className="text-left">
          <p className="text-pastel-sky-blue mt-4 text-lg leading-7">
            South Australia has gone quickly from a fossil-powered laggard to
            having the world’s highest share of wind and solar in a
            gigawatt-scale grid, with a 75% share at June 2024. The state is
            targeting 100% net renewables by 2027. And it’s also part of
            Australia’s National Energy Market, which was one of the first
            jurisdictions globally to move to 5-minute settlements. While this
            is a cause for celebration, it comes with big challenges for energy
            market operators.
          </p>
        </div>
      </ContentSection>
      <ContentSection
        heading="A window into the future of electricity markets"
        imagePosition="left"
        align="left"
        imageContent={
          <div className="bg-animate-color w-[550px] rounded-lg p-6">
            <Image
              src={"/about/energy-prices.png"}
              alt="Energy Prices"
              width={550}
              height={355}
              className="rounded-lg"
            />
            <p className="text-foundation-light-light-active pt-2.5 text-center">
              Wholesale electricity prices in South Australia were fairly
              predictable only a few years ago
            </p>
          </div>
        }
      >
        <div className="text-left">
          <p className="text-pastel-sky-blue mt-4 text-lg leading-7">
            Think crypto or pork belly futures are volatile? They have nothing
            on Australian energy prices. The graph above shows electricity
            prices in South Australia on one day in 2017. In those days energy
            prices were much more predictable. Prices peaked when everyone got
            up and turned on the kettle in the morning, and in the evening when
            we came home from work.
          </p>
        </div>
      </ContentSection>
      <ContentSection
        imagePosition="left"
        align="left"
        imageContent={
          <div className="bg-animate-color flex h-[355px] w-[550px] flex-col justify-center rounded-lg p-6">
            <Image
              src="/about/energy-prices-2024.png"
              alt="Energy Prices 2024"
              width={550}
              height={354}
              className="rounded-lg"
            />
            <p className="text-foundation-light-light-active pt-2.5 text-center">
              Now prices are far more volatile, with bigger spikes and higher
              price ranges occurring more often
            </p>
          </div>
        }
      >
        <div className="text-left">
          <p className="text-pastel-sky-blue mt-4 text-lg leading-7">
            Just seven years later, it’s a very different and much more
            unpredictable story. Prices commonly go negative in the middle of
            the day when renewable generation exceeds 100% of demand. At other
            times, the market peaks at 2x or 3x times the price it used to peak
            at. Forecasting electricity prices and responding to them just got
            so much harder. And it’s likely to get harder as the transition
            continues. We’re addressing these challenges by building tools that
            help energy assets, particularly batteries, operate at the right
            times. Our solutions improve market efficiency and accelerate the
            adoption of renewable energy sources.
          </p>
        </div>
      </ContentSection>
      <GetInTouch />
    </main>
  );
}
