"use client";

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactFormSchema, type ContactFormData } from "@/lib/schemas";
import { contactApi } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import Partners from "@/components/Partners";

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      first_name: "",
      phone: "",
      meetingDate: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    if (!executeRecaptcha) {
      toast.error("Security verification not ready", {
        description: "Please wait a moment and try again.",
        duration: 5000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Execute reCAPTCHA v3
      const recaptchaToken = await executeRecaptcha('contact_form');

      if (!recaptchaToken) {
        toast.error("Security verification failed", {
          description: "Please refresh the page and try again.",
          duration: 5000,
        });
        setIsSubmitting(false);
        return;
      }

      // Add reCAPTCHA token to form data
      const formDataWithRecaptcha = {
        ...data,
        recaptchaToken,
      };

      const response = await contactApi.submit(formDataWithRecaptcha);

      // Check if the response indicates success
      if (response.status === "success") {
        toast.success("Message sent successfully!", {
          description: response.message || "We'll get back to you soon.",
          duration: 5000,
        });
        form.reset();
      } else {
        throw new Error(
          response.error || response.message || "Submission failed",
        );
      }
    } catch (error) {

      // Try to extract error message from API response
      let errorMessage = "Failed to send message";
      let errorDescription = "Please try again or contact us directly.";

      if (error && typeof error === 'object' && 'message' in error) {
        errorDescription = error.message as string;
      }

      toast.error(errorMessage, {
        description: errorDescription,
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-foundation-color">
      <div className="container mx-auto px-4 pt-36">
        <div className="mx-auto flex max-w-7xl flex-col gap-16 lg:flex-row">
          {/* Left Content Section */}
          <div className="flex-1 space-y-8">
            {/* Contact us Label */}
            <div className="inline-block">
              <Badge className="text-foundation-light-light-active border-foundation-light-dark rounded-full border-2 text-sm font-semibold">
                Contact us
              </Badge>
            </div>

            {/* Main Heading */}
            <h1 className="font-inter text-[36px] leading-[44px] font-semibold tracking-[-0.02em] text-white">
              Get in touch
            </h1>

            {/* Description */}
            <p className="font-inter text-foundation-gray-normal max-w-lg text-[16px] leading-[24px] font-normal tracking-[0em]">
              We offer tailored modelling, backtest simulations, and trial runs
              on your current or proposed systems - so you can see the
              real-world value before making a commitment.
            </p>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Email Address */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center">
                  <svg
                    width="56"
                    height="56"
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="4"
                      y="4"
                      width="48"
                      height="48"
                      rx="24"
                      fill="#204257"
                    />
                    <rect
                      x="4"
                      y="4"
                      width="48"
                      height="48"
                      rx="24"
                      stroke="#193344"
                      strokeWidth="8"
                    />
                    <path
                      d="M18 23L26.1649 28.7154C26.8261 29.1783 27.1567 29.4097 27.5163 29.4993C27.8339 29.5785 28.1661 29.5785 28.4837 29.4993C28.8433 29.4097 29.1739 29.1783 29.8351 28.7154L38 23M22.8 36H33.2C34.8802 36 35.7202 36 36.362 35.673C36.9265 35.3854 37.3854 34.9265 37.673 34.362C38 33.7202 38 32.8802 38 31.2V24.8C38 23.1198 38 22.2798 37.673 21.638C37.3854 21.0735 36.9265 20.6146 36.362 20.327C35.7202 20 34.8802 20 33.2 20H22.8C21.1198 20 20.2798 20 19.638 20.327C19.0735 20.6146 18.6146 21.0735 18.327 21.638C18 22.2798 18 23.1198 18 24.8V31.2C18 32.8802 18 33.7202 18.327 34.362C18.6146 34.9265 19.0735 35.3854 19.638 35.673C20.2798 36 21.1198 36 22.8 36Z"
                      stroke="#4893C1"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-inter mb-1 text-lg font-semibold text-white">
                    Email Address
                  </h3>
                  <p className="font-inter text-foundation-light-normal text-base">
                    Hello@OptiGrid.energy
                  </p>
                </div>
              </div>

              {/* Office Address */}
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center">
                  <svg
                    width="56"
                    height="56"
                    viewBox="0 0 56 56"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="4"
                      y="4"
                      width="48"
                      height="48"
                      rx="24"
                      fill="#204257"
                    />
                    <rect
                      x="4"
                      y="4"
                      width="48"
                      height="48"
                      rx="24"
                      stroke="#193344"
                      strokeWidth="8"
                    />
                    <path
                      d="M28 28.5C29.6569 28.5 31 27.1569 31 25.5C31 23.8431 29.6569 22.5 28 22.5C26.3431 22.5 25 23.8431 25 25.5C25 27.1569 26.3431 28.5 28 28.5Z"
                      stroke="#4893C1"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M28 38C30 34 36 31.4183 36 26C36 21.5817 32.4183 18 28 18C23.5817 18 20 21.5817 20 26C20 31.4183 26 34 28 38Z"
                      stroke="#4893C1"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-inter mb-1 text-lg font-semibold text-white">
                    Office
                  </h3>
                  <p className="font-inter text-foundation-light-normal text-base">
                    Lot Fourteen, North Terrace,
                    <br />
                    Adelaide SA 5000, Australia
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Section */}
          <div className="flex-1 space-y-8">
            {/* Contact Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
              >
                {/* Name and Email Row */}
                <div className="flex flex-col gap-6 md:flex-row">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-white">
                          Your name *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="First name"
                            className="bg-animate-color h-[44px] rounded-lg border border-[#303F50] px-[14px] py-[10px] text-white backdrop-blur-sm transition-all placeholder:text-[#6c7981] focus:border-[#4893C1] focus:ring-2 focus:ring-[#4893C1] focus:outline-none focus-visible:border-[#4893C1] focus-visible:ring-[#4893C1]/50"
                            {...field}
                          />
                        </FormControl>
                        <div className="flex h-[10px] items-start">
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-white">
                          Work email *
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@company.com"
                            className="bg-animate-color h-[44px] rounded-lg border border-[#303F50] px-[14px] py-[10px] text-white backdrop-blur-sm transition-all placeholder:text-[#6c7981] focus:border-[#4893C1] focus:ring-2 focus:ring-[#4893C1] focus:outline-none focus-visible:border-[#4893C1] focus-visible:ring-[#4893C1]/50"
                            {...field}
                          />
                        </FormControl>
                        <div className="flex h-[10px] items-start">
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Phone Field */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Phone number</FormLabel>
                      <div className="flex h-[44px] gap-2">
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+61 (555) 000-0000"
                            className="bg-animate-color h-[44px] rounded-lg border border-[#303F50] px-[14px] py-[10px] text-white backdrop-blur-sm transition-all placeholder:text-[#6c7981] focus:border-[#4893C1] focus:ring-2 focus:ring-[#4893C1] focus:outline-none focus-visible:border-[#4893C1] focus-visible:ring-[#4893C1]/50"
                            {...field}
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />

                {/* Meeting Date Field */}
                <FormField
                  control={form.control}
                  name="meetingDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Preferred meeting date and time
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ex. 10 June 2025"
                          className="bg-animate-color h-[44px] rounded-lg border border-[#303F50] px-[14px] py-[10px] text-white backdrop-blur-sm transition-all placeholder:text-[#6c7981] focus:border-[#4893C1] focus:ring-2 focus:ring-[#4893C1] focus:outline-none focus-visible:border-[#4893C1] focus-visible:ring-[#4893C1]/50"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Message Field */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Tell us more about your meeting request
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Sharing anything about the nature of your projects and need can help us be ready when we meet!"
                          className="bg-animate-color min-h-[110px] resize-none rounded-lg border border-[#303F50] px-[14px] py-[10px] text-white backdrop-blur-sm transition-all placeholder:text-[#6c7981] focus:border-[#4893C1] focus:ring-2 focus:ring-[#4893C1] focus:outline-none focus-visible:border-[#4893C1] focus-visible:ring-[#4893C1]/50"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* reCAPTCHA v3 працює невидимо */}

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="bg-foundation-light-normal hover:bg-foundation-light-dark disabled:bg-foundation-light-dark/50 w-full rounded-lg px-12 py-4 text-lg font-semibold text-white transition-all duration-300"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <div className="container mx-auto px-4 py-16">
          <Partners />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
