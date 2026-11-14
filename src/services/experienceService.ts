import type { AppLocale } from "@/constants/locales";
import type { Experience } from "@/domain/entities/Experience";
import type { IExperienceRepository } from "@/domain/repositories/IExperienceRepository";

// Facade provides a focused experience API and depends on its domain repository interface.
export class ExperienceService {
  constructor(private readonly experienceRepository: IExperienceRepository) {}

  getAllExperiences(locale: AppLocale): Promise<readonly Experience[]> {
    return this.experienceRepository.getAll(locale);
  }

  getExperienceById(id: string, locale: AppLocale): Promise<Experience | null> {
    return this.experienceRepository.getById(id, locale);
  }
}
