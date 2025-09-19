import { z } from "zod";

export const contactFormSchema = z.object({
  first_name: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  phone: z.string().optional(),
  country: z.string().optional(),
  meetingDate: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
  recaptchaToken: z.string().nullable().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
