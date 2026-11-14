import type { AppLocale } from "@/constants/locales";
import type { Project } from "@/domain/entities/Project";

// Repository contracts enable dependency inversion between services and data access.
export interface IProjectRepository {
  getAll(locale: AppLocale): Promise<readonly Project[]>;
  getBySlug(slug: string, locale: AppLocale): Promise<Project | null>;
}
