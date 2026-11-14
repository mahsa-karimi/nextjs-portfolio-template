import { Badge } from "@/components/ui/badge";
import { getExperiences } from "@/features/experience/services/experience-content-service";
import type { AppLocale } from "@/constants/locales";
import { getExperienceMessages } from "@/features/experience/services/experience-messages-service";

type ExperiencePageProps = {
  locale: AppLocale;
};

export async function ExperiencePage({ locale }: ExperiencePageProps) {
  const [experiences, t] = await Promise.all([
    getExperiences(locale),
    getExperienceMessages(locale),
  ]);

  return (
    <div className="flex flex-1 flex-col gap-10 py-4 text-start">
      <header className="max-w-2xl space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </header>
      <ol className="border-border space-y-10 border-s ps-6 sm:ps-8">
        {experiences.map((experience) => (
          <li key={experience.id} className="relative">
            <span
              aria-hidden="true"
              className="bg-primary ring-background absolute -start-[calc(1.5rem+5px)] top-1.5 size-2.5 rounded-full ring-4 sm:-start-[calc(2rem+5px)]"
            />
            <article className="space-y-4">
              <div className="space-y-1">
                <p className="text-muted-foreground text-sm">
                  {t("periodHint")}
                </p>
                <h2 className="text-xl font-semibold">{experience.role}</h2>
                <p className="font-medium">{experience.organization}</p>
                <p className="text-muted-foreground text-sm">
                  {experience.location}
                </p>
              </div>
              <h3 className="text-lg font-medium">{experience.title}</h3>
              <p className="text-muted-foreground max-w-3xl leading-relaxed">
                {experience.description}
              </p>
              <ul className="max-w-3xl list-inside list-disc space-y-2 text-sm leading-relaxed">
                {experience.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <ul
                className="flex flex-wrap gap-2"
                aria-label={t("technologies")}
              >
                {experience.techStack.map((technology) => (
                  <li key={technology}>
                    <Badge variant="secondary">{technology}</Badge>
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
