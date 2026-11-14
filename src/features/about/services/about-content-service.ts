import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/constants/locales";

export function getAboutContent(locale: AppLocale) {
  return getTranslations({ locale, namespace: "About" });
}
