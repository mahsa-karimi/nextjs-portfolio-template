import type { AppLocale } from "@/constants/locales";
import { projectService } from "@/services";

export function getProjects(locale: AppLocale) {
  return projectService.getAllProjects(locale);
}

export function getFeaturedProjects(locale: AppLocale) {
  return projectService.getFeaturedProjects(locale);
}

export function getProject(slug: string, locale: AppLocale) {
  return projectService.getProjectBySlug(slug, locale);
}

export async function getProjectSlugs() {
  const projects = await projectService.getAllProjects("en");
  return projects.map(({ slug }) => ({ slug }));
}
