

import { Button } from "@/components/ui/button";
import ContentSection from "@/components/Section";
import ImageSection from "@/components/ImageSection";
import ReadyToExplore from "@/components/ReadyToExplore";
import Image from "next/image";
import Link from "next/link";
import { OPENBESS_FEATURE_CARDS } from "@/constants/consts";
import { getSEOBySlug } from "@/graphql/api/seo";
import {generateMetadataFromSEO} from "@/lib/seo";

// Key benefits for the OpenBESS platform
const PLATFORM_BENEFITS = [
  "Battery storage is essential, yet not well-tracked elsewhere.",
  "Access up-to-date operational data for informed decisions.",
  "Remains a free resource for the broader energy community.",
];

/**
 * Feature card component for displaying platform capabilities
 */
export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateMetadata() {
  // Using await for params to ensure it's properly resolved before accessing properties

  try {
    const seoData = await getSEOBySlug('openbess', 'page', ['openbess']);

    return generateMetadataFromSEO(
      seoData.seoData,
      seoData.generalSettings,
      `${process.env.NEXT_PUBLIC_SITE_URL}/products`
    );
  } catch (error) {
      return  null
  }
}
const FeatureCard = ({
  icon,
  title,
  description,
  alt,
}: {
  icon: string;
  title: string;
  description: string;
  alt: string;
}) => (
  <div className="rounded-lg p-6">
    <div className="mb-4 flex justify-center">
      <div className="rounded-lg p-3">
        <Image src={icon} width={48} height={50} alt={alt} />
      </div>
    </div>
    <h3 className="mb-3 text-center text-lg font-semibold text-white">
      {title}
    </h3>
    <p className="text-center text-sm leading-relaxed text-[#E4EFF6]">
      {description}
    </p>
  </div>
);

/**
 * Benefit list item component for consistent styling
 */
const BenefitItem = ({ children }: { children: string }) => (
  <li>
    <Image
      src="/icons/check.svg"
      alt="Check icon"
      width={28}
      height={28}
      className="mr-2 inline-block"
    />
    {children}
  </li>
);

/**
 * OpenBESS product page showcasing platform features and benefits
 * Provides comprehensive information about battery energy storage system analytics
 */
const OpenBessPage = () => {
  return (
    <div className="bg-foundation-color min-h-screen py-20">
      {/* Hero section with main value proposition */}
      <ContentSection
        badgeText="OpenBESS"
        enableAnimation
        heading="Making grid-scale battery performance in the NEM simple to track."
        imagePosition="right"
        align="left"
        imageContent={
          <div
            style={{ width: 540, height: 375 }}
            className="rounded-lg bg-gray-800 p-1"
          >
            <Image
              src="/products/sc2.png"
              alt="OpenBESS platform dashboard"
              width={540}
              height={375}
              className="rounded-lg"
            />
          </div>
        }
        bgContainer={
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 mx-auto w-1/2 bg-[#15283E] opacity-[32%] blur-[124.4px]" />
          </div>
        }
      >
        <div className="text-left">
          <p className="mt-6 text-lg text-[#E4EFF6]">
            OpenBESS is an open-access platform providing information and
            analytics about Battery Energy Storage System (BESS) in the
            Australian National Electricity Market (NEM)
          </p>
          <Button
            asChild
            className="bg-foundation-light-dark hover:bg-foundation-light-dark/80 mt-8 cursor-pointer px-6 py-2 text-base md:px-7 md:py-2.5 md:text-lg"
            size="xl"
            aria-label="Create free OpenBESS account"
          >
            <Link href="/#">Create Free Account</Link>
          </Button>
        </div>
      </ContentSection>

      {/* Features overview section */}
      <ContentSection
        badgeText="How we're different"
        heading="Tracking how batteries are actually performing."
        align="center"
        enableAnimation
      >
        <div className="text-center">
          <p className="text-pastel-sky-blue mt-5 text-base md:text-lg">
            OpenBESS offers up-to-date and historical data on operational BESS,
            with insights refreshed regularly.
          </p>
        </div>

        {/* Dynamic feature cards grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3">
          {OPENBESS_FEATURE_CARDS.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </ContentSection>

      {/* Visual break with background image */}
      <ImageSection imageUrl="/bg-opt-pr.jpg" />

      {/* Platform benefits section */}
      <ContentSection
        heading="Why OpenBESS?"
        imagePosition="right"
        align="left"
        enableAnimation
        imageContent={
          <div className="h-[355px] w-[550px] rounded-lg">
            <Image
              src="/products/openbess-img1.png"
              alt="OpenBESS data visualization and analytics"
              width={550}
              height={355}
              className="rounded-lg"
            />
          </div>
        }
      >
        <div className="text-left">
          <p className="text-pastel-sky-blue mt-4 text-lg leading-7">
            OpenBESS provides data spanning from several years back to just two
            days ago, covering all commercially operational BESS. This enables
            granular visibility into battery storage usage, bridging gaps in
            Australia&apos;s electricity sector.
          </p>
          <ul className="text-pastel-sky-blue mt-6 space-y-5 md:mt-8">
            {PLATFORM_BENEFITS.map((benefit, index) => (
              <BenefitItem key={index}>{benefit}</BenefitItem>
            ))}
          </ul>
        </div>
      </ContentSection>

      {/* Mission and vision section */}
      <ContentSection
        heading="Why is it free to use?"
        imagePosition="left"
        align="left"
        enableAnimation
        imageContent={
          <div className="h-[355px] w-[550px] rounded-lg">
            <Image
              src="/products/openbess-img2.png"
              alt="OptiGrid's mission for energy transition"
              width={550}
              height={354}
              className="rounded-lg"
            />
          </div>
        }
      >
        <div className="text-left">
          <p className="text-pastel-sky-blue mt-4 text-lg leading-7">
            Batteries are a unique asset class—financial performance depends
            significantly on their utilisation and operational strategy (see our
            blog on this topic). Optimising battery operations is crucial for
            improving their economic viability, lowering energy costs for
            consumers, and supporting the renewable energy transition.
          </p>
          <p className="text-pastel-sky-blue mt-2.5 text-lg leading-7">
            At OptiGrid, our mission is to accelerate Australia&apos;s energy
            transition by enabling better battery operators. Providing free,
            transparent access to battery data supports industry-wide
            collaboration and learning, ultimately driving more efficient and
            robust battery deployment.
          </p>
        </div>
      </ContentSection>
      <ReadyToExplore />
    </div>
  );
};

export default OpenBessPage;
