import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/constants/locales";

export function getExperienceMessages(locale: AppLocale) {
  return getTranslations({ locale, namespace: "Experience" });
}
