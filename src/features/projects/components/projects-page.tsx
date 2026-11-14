import type { AppLocale } from "@/constants/locales";
import { ProjectCard } from "@/features/projects/components/project-card";
import { getProjects } from "@/features/projects/services/project-content-service";
import { getProjectMessages } from "@/features/projects/services/project-messages-service";

type ProjectsPageProps = {
  locale: AppLocale;
};

export async function ProjectsPage({ locale }: ProjectsPageProps) {
  const [projects, t] = await Promise.all([
    getProjects(locale),
    getProjectMessages(locale),
  ]);

  return (
    <div className="flex flex-1 flex-col gap-10 py-4 text-start">
      <header className="max-w-2xl space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </header>
      <section aria-label={t("title")} className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>
    </div>
  );
}
