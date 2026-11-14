import type { AppLocale } from "@/constants/locales";
import type { Experience } from "@/domain/entities/Experience";

// Repository contracts enable dependency inversion between services and data access.
export interface IExperienceRepository {
  getAll(locale: AppLocale): Promise<readonly Experience[]>;
  getById(id: string, locale: AppLocale): Promise<Experience | null>;
}
