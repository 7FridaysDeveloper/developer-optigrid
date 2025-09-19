"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { newsletterApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleNewsletterSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!newsletterEmail.trim()) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!executeRecaptcha) {
      toast.error("Security verification not ready", {
        description: "Please wait a moment and try again.",
        duration: 5000,
      });
      return;
    }

    setIsNewsletterSubmitting(true);

    try {
      // Execute reCAPTCHA v3
      const recaptchaToken = await executeRecaptcha('newsletter_subscribe');

      if (!recaptchaToken) {
        toast.error("Security verification failed", {
          description: "Please refresh the page and try again.",
          duration: 5000,
        });
        setIsNewsletterSubmitting(false);
        return;
      }

      const response = await newsletterApi.subscribe({
        email: newsletterEmail.trim(),
        recaptchaToken,
      });

      // Check if the response indicates success (either response.success or response.status === "success")
      if (response.success || response.status === "success") {
        toast.success("Successfully subscribed to newsletter!", {
          description:
            response.message ||
            "You'll receive our latest updates and insights.",
          duration: 5000,
        });
        setNewsletterEmail("");
      } else {
        throw new Error(
          response.error || response.message || "Subscription failed",
        );
      }
    } catch (error) {
      toast.error("Failed to subscribe to newsletter", {
        description: "Please try again or contact us directly.",
        duration: 5000,
      });
    } finally {
      setIsNewsletterSubmitting(false);
    }
  };
  return (
    <footer className="bg-foundation-color text-foundation-gray-normal pt-16 pb-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {/* Logo and Description */}
          <div className="space-y-6 md:col-span-2">
            <Image
              src="/logos/logo.webp"
              alt="OptiGrid Logo"
              width={110}
              height={40}
              className="h-10"
            />
            <p className="text-sm leading-5">
              OptiGrid delivers intelligent software solutions for asset
              optimisation and energy trading, maximising returns across all
              markets and contracts. Spun out of the University of Adelaide, we
              bring cutting-edge data science to the renewable and battery
              sector.
            </p>
          </div>

          {/* Quick Links & Contact */}
          <div className="grid grid-cols-2 md:col-span-2 md:grid-cols-2 md:gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="mb-4 text-sm font-semibold">QUICK LINKS</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/blog"
                    className="text-sm transition-colors duration-200 hover:text-[#4893C1]"
                  >
                    News & Insights
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact-us"
                    className="text-sm transition-colors duration-200 hover:text-[#4893C1]"
                  >
                    Get in touch
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us"
                    className="text-sm transition-colors duration-200 hover:text-[#4893C1]"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/openbess"
                    className="text-sm transition-colors duration-200 hover:text-[#4893C1]"
                  >
                    Solution
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="mb-4 font-semibold">CONTACT</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  {/* Email.svg */}
                  <Image
                    src={"/icons/email.svg"}
                    alt="Email icon"
                    className="size-5"
                    width={20}
                    height={20}
                  />
                  <p className="text-sm text-gray-200">Hello@OptiGrid.energy</p>
                </li>
                <li className="flex items-center gap-2">
                  <Image
                    src={"/icons/location.svg"}
                    alt="Location icon"
                    className="size-5"
                    width={20}
                    height={20}
                  />
                  <p className="text-sm leading-5 text-gray-200">
                    Lot fourteen, Adelaide SA 5000, Australia
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <Image
                    src={"/icons/linkedin.svg"}
                    alt="LinkedIn icon"
                    className="size-5"
                    width={20}
                    height={20}
                  />
                  <Link
                    href="https://www.linkedin.com/company/optigrid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-200 transition-colors duration-200 hover:text-[#4893C1]"
                  >
                    Linkedin
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 font-semibold">NEWSLETTER</h3>
            <form className="flex flex-col" onSubmit={handleNewsletterSubmit}>
              <span className="text-foundation-gray-normal mb-4 text-xs">
                Subscribe for our latest blog posts, tech updates, and news!
              </span>
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="border-foundation-light-darker mb-4 rounded-[100px] border bg-transparent px-3.5 py-2.5 text-sm text-white"
              />
              <div>
                <Button
                  type="submit"
                  disabled={isNewsletterSubmitting}
                  className="bg-foundation-light-dark hover:bg-foundation-light-dark/80 w-auto cursor-pointer rounded-[100px] text-sm disabled:opacity-50"
                  size={"lg"}
                  aria-label="Subscribe"
                >
                  {isNewsletterSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
            </form>
          </div>
        </div>

        <hr className="border-gray-700" />

        <div className="text-foundation-gray-normal flex flex-col items-center justify-between pt-8 text-sm md:flex-row">
          <p>OptiGrid Pty Ltd ACN 676 027 786 | © Copyright OptiGrid 2025</p>
          <div className="mt-4 flex gap-4 md:mt-0">
            <Link
              href="#"
              className="transition-colors duration-200 hover:text-[#4893C1]"
            >
              Terms of service
            </Link>
            <Link
              href="#"
              className="transition-colors duration-200 hover:text-[#4893C1]"
            >
              Privacy policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
