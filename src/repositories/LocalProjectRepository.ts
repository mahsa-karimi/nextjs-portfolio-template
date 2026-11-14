import type { AppLocale } from "@/constants/locales";
import type { Project } from "@/domain/entities/Project";
import type { IProjectRepository } from "@/domain/repositories/IProjectRepository";
import { projects } from "@/data/projects";

// Repository pattern adapts typed local data to the project repository contract.
export class LocalProjectRepository implements IProjectRepository {
  async getAll(locale: AppLocale): Promise<readonly Project[]> {
    return projects.map((project) => this.toDomainModel(project, locale));
  }

  async getBySlug(slug: string, locale: AppLocale): Promise<Project | null> {
    const project = projects.find((item) => item.slug === slug);
    return project ? this.toDomainModel(project, locale) : null;
  }

  private toDomainModel(
    project: (typeof projects)[number],
    locale: AppLocale,
  ): Project {
    const translation = project.translations[locale];

    return {
      locale,
      slug: project.slug,
      featured: project.featured,
      images: project.images.map((image) => ({
        ...image,
        alt: translation.imageAlt,
      })),
      links: project.links,
      techStack: project.techStack,
      dates: project.dates,
      ...translation,
    };
  }
}
