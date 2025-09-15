import Products from "@/components/Products";
import { getSEOBySlug } from "@/graphql/api/seo";
import {generateMetadataFromSEO} from "@/lib/seo";
export const dynamic = "force-static";
export const revalidate = 3600;
export async function generateMetadata() {
  // Using await for params to ensure it's properly resolved before accessing properties

  try {
    const seoData = await getSEOBySlug('products', 'page', ['products']);

    return generateMetadataFromSEO(
      seoData.seoData,
      seoData.generalSettings,
      `${process.env.NEXT_PUBLIC_SITE_URL}`
    );
  } catch (error) {
    return  null
  }
}
export default function ProductsPage() {
  return (
    <article className="container mx-auto px-4 py-12">
      <h1 className="sr-only">Our Products</h1>
      <Products />
    </article>
  );
}
