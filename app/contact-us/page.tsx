import { getSEOBySlug } from "@/graphql/api/seo";
import { generateMetadataFromSEO } from "@/lib/seo";
import ContactUs from "@/components/forms/contact-us";

/**
 * Contact Us Page Component
 * 
 * This page component serves as a Server Component to handle SEO metadata generation
 * and server-side data fetching. The actual ContactUs form component is separated 
 * into a Client Component (components/forms/contact-us.tsx) since it requires client-side
 * interactivity for form handling, state management, and user interactions.
 * 
 * This separation follows Next.js best practices:
 * - Server Components: Handle SEO, metadata, and server-side data fetching
 * - Client Components: Handle user interactions, form state, and browser APIs
 */

export async function generateMetadata() {
    // Using await for params to ensure it's properly resolved before accessing properties

    try {
        const seoData = await getSEOBySlug('contact-us', 'page', ['contact-us']);

        return generateMetadataFromSEO(
            seoData.seoData,
            seoData.generalSettings,
            `${process.env.NEXT_PUBLIC_SITE_URL}`
        );
    } catch (error) {
        return null;
    }
}

function ContactUsPage() {
    return (
        <ContactUs />
    )
}

export default ContactUsPage