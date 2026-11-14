import type { AppLocale } from "@/constants/locales";
import type { Project } from "@/domain/entities/Project";
import type { IProjectRepository } from "@/domain/repositories/IProjectRepository";

// Facade provides a focused project API and depends on its domain repository interface.
export class ProjectService {
  constructor(private readonly projectRepository: IProjectRepository) {}

  getAllProjects(locale: AppLocale): Promise<readonly Project[]> {
    return this.projectRepository.getAll(locale);
  }

  async getFeaturedProjects(locale: AppLocale): Promise<readonly Project[]> {
    const projects = await this.projectRepository.getAll(locale);
    return projects.filter((project) => project.featured);
  }

  getProjectBySlug(slug: string, locale: AppLocale): Promise<Project | null> {
    return this.projectRepository.getBySlug(slug, locale);
  }
}
