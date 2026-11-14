import type { AppLocale } from "@/constants/locales";
import type { Experience } from "@/domain/entities/Experience";
import type { IExperienceRepository } from "@/domain/repositories/IExperienceRepository";
import { experiences } from "@/data/experience";

// Repository pattern adapts typed local data to the experience repository contract.
export class LocalExperienceRepository implements IExperienceRepository {
  async getAll(locale: AppLocale): Promise<readonly Experience[]> {
    return experiences.map((experience) =>
      this.toDomainModel(experience, locale),
    );
  }

  async getById(id: string, locale: AppLocale): Promise<Experience | null> {
    const experience = experiences.find((item) => item.id === id);
    return experience ? this.toDomainModel(experience, locale) : null;
  }

  private toDomainModel(
    experience: (typeof experiences)[number],
    locale: AppLocale,
  ): Experience {
    const translation = experience.translations[locale];

    return {
      locale,
      id: experience.id,
      organization: experience.organization,
      images: experience.images.map((image) => ({
        ...image,
        alt: translation.imageAlt,
      })),
      links: experience.links,
      techStack: experience.techStack,
      dates: experience.dates,
      ...translation,
    };
  }
}
