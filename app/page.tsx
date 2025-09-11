// Navbar
// Hero section
// about section
// features section
// Hero second
// Products
// blogs
// partners
// contact
// footer

import AboutSection from "@/components/About";
import TrustedByPartners from "@/components/TrustedByPartners";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Products from "@/components/Products";
import Blogs from "@/components/Blogs/Blogs";
import Partners from "@/components/Partners";

import ImageSection from "@/components/ImageSection";
import Stats from "@/components/Stats";
import GetInTouch from "@/components/GetInTouch";
import { getSEOBySlug } from "@/graphql/api/seo";
import { generateMetadataFromSEO } from "@/lib/seo";
export const dynamic = "force-static";
export const revalidate = 3600;
export async function generateMetadata() {
  try {
    const seoData = await getSEOBySlug('home', 'page', ['home']);

    return generateMetadataFromSEO(
      seoData.seoData,
      seoData.generalSettings,
      `${process.env.NEXT_PUBLIC_SITE_URL}`
    );
  } catch (error) {
    return null;
  }
}
export default function Home() {
  return (
    <main className="bg-foundation-color text-black">
      <Hero />
      <TrustedByPartners />
      <AboutSection />
      <Stats />
      <Features />
      <ImageSection imageUrl="/bg-opti.webp" />
      <Products />
      <Blogs idsPosts={[91, 93, 95]} />
      <Partners />
      <GetInTouch />
    </main>
  );
}
