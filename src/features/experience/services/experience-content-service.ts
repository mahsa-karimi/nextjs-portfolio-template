import type { AppLocale } from "@/constants/locales";
import { experienceService } from "@/services";

export function getExperiences(locale: AppLocale) {
  return experienceService.getAllExperiences(locale);
}
