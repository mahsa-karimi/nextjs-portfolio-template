import { defineRouting } from "next-intl/routing";
import { SUPPORTED_LOCALES } from "@/constants/locales";

export const routing = defineRouting({
  locales: SUPPORTED_LOCALES,
  defaultLocale: "en",
  localePrefix: "always",
});

export type { AppLocale } from "@/constants/locales";
