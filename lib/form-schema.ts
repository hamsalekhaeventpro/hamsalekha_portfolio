import { z } from "zod";

export const enquirySchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your name")
    .max(80, "Name is too long"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .max(20, "Phone number is too long"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .nullable()
    .or(z.literal("")),
  clientType: z.enum(
    ["Family", "Planner / Decorator", "Corporate / Agency", "Venue"] as const,
    { error: "Please select who you are" }
  ),
  eventType: z.enum(
    ["Wedding", "Reception", "Sangeet / Mehendi", "Puja", "Corporate", "Launch", "Other"] as const,
    { error: "Please select an event type" }
  ),
  eventDate: z.string().min(1, "Please select an event date"),
  venue: z
    .string()
    .min(2, "Please enter a venue")
    .max(150, "Venue name is too long"),
  guestCount: z.enum(
    ["Under 200", "200–500", "500–1,000", "1,000+"] as const,
    { error: "Please select a guest count" }
  ),
  services: z
    .array(z.string())
    .min(1, "Please select at least one service"),
  message: z.string().max(1000, "Message is too long").optional(),
  honeypot: z.string().max(100).optional(),
  turnstileToken: z.string().optional(),
});

export type EnquiryFormValues = z.infer<typeof enquirySchema>;
