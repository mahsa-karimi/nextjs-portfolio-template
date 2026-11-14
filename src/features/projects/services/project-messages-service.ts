import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/constants/locales";

export function getProjectMessages(locale: AppLocale) {
  return getTranslations({ locale, namespace: "Projects" });
}

export function getProjectDetailMessages(locale: AppLocale) {
  return getTranslations({ locale, namespace: "ProjectDetail" });
}
