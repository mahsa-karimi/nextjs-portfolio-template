import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/constants/locales";

export function getHomeMessages(locale: AppLocale) {
  return getTranslations({ locale, namespace: "Home" });
}
