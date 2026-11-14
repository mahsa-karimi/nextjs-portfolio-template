import { z } from "zod";

const environmentSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),
  API_BASE_URL: z.url().optional(),
  CONTACT_EMAIL: z.email().default("hello@example.com"),
  CONTACT_FROM_EMAIL: z.email().optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
});

export const env = environmentSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  API_BASE_URL: process.env.API_BASE_URL,
  CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
});
