
import GetInTouch from "@/components/GetInTouch";
import ImageSection from "@/components/ImageSection";
import ContentSection from "@/components/Section";
import AssetOptimizationCards from "@/components/AssetOptimizationCards";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link";
import HowWereDifferent from "@/components/AdvantageSection";
import OptibidderFeatures from "@/components/OptibidderFeatures";
import { getSEOBySlug } from "@/graphql/api/seo";
import { generateMetadataFromSEO } from "@/lib/seo";
export const dynamic = "force-static";
export async function generateMetadata() {
  try {
    const seoData = await getSEOBySlug('optibidder', 'page', ['optibidder']);


    return generateMetadataFromSEO(
      seoData.seoData,
      seoData.generalSettings,
      `${process.env.NEXT_PUBLIC_SITE_URL}/products`
    );
  } catch (error) {
    console.log('error seo', 'optibidder')
    return null;
  }
}
async function OptiBidder() {
  return (
    <div className="bg-foundation-color min-h-screen py-20">
      {/* Hero section with main value proposition */}
      <ContentSection
        enableAnimation
        badgeText="OptiBidder"
        heading="Experience next-gen energy market trading with <span>OptiBidder</span>"
        imagePosition="right"
        align="left"
        imageContent={
          <div className="rounded-lg bg-gray-800 p-1">
            <Image
              src="/products/sc1.png"
              alt="OpenBESS platform dashboard"
              width={540}
              height={375}
              className="rounded-lg"
              priority
            />
          </div>
        }
        bgContainer={
          <div className="absolute inset-0 z-0 mx-auto w-[30%]">
            <div className="absolute inset-0 mx-auto w-1/2 bg-[#15283E] opacity-[32%] blur-[124.4px]" />
          </div>
        }
      >
        <div className="text-left">
          <p className="mt-6 text-lg text-[#E4EFF6]">
            Designed for the Australian market by industry veterans in energy
            optimisation and commercial strategy, OptiBidder delivers unmatched
            forecasting accuracy and proprietary bidding intelligence. This
            platform helps your team navigate the volatile nature of the NEM and
            maximise the returns from your batteries.
          </p>
          <Button
            asChild
            className="bg-foundation-light-dark hover:bg-foundation-light-dark/80 mt-8 cursor-pointer px-6 py-2 text-base md:px-7 md:py-2.5 md:text-lg"
            size="xl"
            aria-label="Create free OpenBESS account"
          >
            <Link href="/contact-us">Contact us</Link>
          </Button>
        </div>
      </ContentSection>
      <ContentSection
        badgeText="How we're different"
        heading="Optimised <span>Assets</span> Maximised <span>Returns</span>"
        align="left"
        enableAnimation
        imageContent={
          <Card className="w-full max-w-[455px] justify-start rounded-2xl border-0 bg-inherit py-0 shadow-lg">
            <CardContent className="flex flex-col items-center p-0">
              <Image
                src="/flowchart.png"
                width={408}
                height={510}
                alt="OptiGrid Flow Diagram"
                className="h-auto max-h-[510] w-auto rounded-lg"
                priority
              />
            </CardContent>
          </Card>
        }
        imagePosition="left"
        className="py-20"
        imageClass="justify-start w-full"
      >
        <div className="mt-8 flex flex-col gap-6 md:gap-8">
          <p className="leading-7 text-gray-300">
            OptiGrid provides asset optimisation and trading solutions designed
            specifically for Australia’s National Electricity Market (NEM).
          </p>
          <AssetOptimizationCards />
        </div>
      </ContentSection>
      <ContentSection
        badgeText="Our advantage"
        heading="How we're different"
        align="left"
        enableAnimation
      >
        <HowWereDifferent />
      </ContentSection>

      <ImageSection imageUrl="/bg-opt-pr.jpg" />
      <OptibidderFeatures />
      <ContentSection enableAnimation>
        <Card className="bg-animate-color border-0 px-0 py-0">
          <CardContent className="flex flex-col items-start gap-8 px-6 py-10 md:px-10 md:py-12 lg:py-14">
            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-4">
                <h4 className="text-left text-[32px] text-white">
                  A culture of continual improvement and testing
                </h4>
                <p className="text-foundation-light-light text-left text-base">
                  OptiGrid’s energy market experts and data scientists
                  continuously improve our AI-powered price forecasting and
                  trading algorithms. We use advanced backtest modelling systems
                  to accurately simulate real-world conditions, ensuring our
                  solutions consistently exceed performance expectations.
                </p>
              </div>
              <div className="flex justify-end">
                <Image
                  src="/flow3.png"
                  width={320}
                  height={320}
                  alt="OptiBidder logo"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </ContentSection>
      <GetInTouch />
    </div>
  );
}

export default OptiBidder;