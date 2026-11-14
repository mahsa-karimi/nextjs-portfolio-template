import { Badge } from "@/components/ui/badge";
import { getAboutContent } from "@/features/about/services/about-content-service";
import type { AppLocale } from "@/constants/locales";

type AboutPageProps = {
  locale: AppLocale;
};

const skillGroups = [
  "frameworks",
  "programmingLanguages",
  "tools",
  "libraries",
  "methodologies",
] as const;

export async function AboutPage({ locale }: AboutPageProps) {
  const t = await getAboutContent(locale);
  const education = t.raw("education.items") as Array<{
    degree: string;
    institution: string;
    dates: string;
  }>;
  const languages = t.raw("languages.items") as string[];

  return (
    <div className="flex flex-1 flex-col gap-12 py-16 text-start">
      <section aria-labelledby="about-title" className="max-w-3xl space-y-4">
        <h1 id="about-title" className="text-4xl font-semibold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          {t("bio")}
        </p>
        <p className="text-muted-foreground leading-relaxed">
          {t("availability")}
        </p>
        <p className="font-medium">{t("location")}</p>
      </section>
      <section aria-labelledby="skills-title" className="space-y-6">
        <div className="space-y-2">
          <h2 id="skills-title" className="text-2xl font-semibold">
            {t("skillsTitle")}
          </h2>
          <p className="text-muted-foreground">{t("skillsDescription")}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group) => {
            const skills = t.raw(`skills.${group}.items`) as string[];

            return (
              <section
                key={group}
                aria-labelledby={`skills-${group}`}
                className="space-y-3"
              >
                <h3 id={`skills-${group}`} className="font-semibold">
                  {t(`skills.${group}.title`)}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <li key={skill}>
                      <Badge variant="secondary">{skill}</Badge>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </section>
      <section aria-labelledby="education-title" className="space-y-5">
        <h2 id="education-title" className="text-2xl font-semibold">
          {t("education.title")}
        </h2>
        <ol className="space-y-5">
          {education.map((item) => (
            <li key={`${item.institution}-${item.dates}`} className="space-y-1">
              <h3 className="font-semibold">{item.degree}</h3>
              <p>{item.institution}</p>
              <p className="text-muted-foreground text-sm">{item.dates}</p>
            </li>
          ))}
        </ol>
      </section>
      <section aria-labelledby="languages-title" className="space-y-4">
        <h2 id="languages-title" className="text-2xl font-semibold">
          {t("languages.title")}
        </h2>
        <ul className="flex flex-wrap gap-2">
          {languages.map((language) => (
            <li key={language}>
              <Badge variant="secondary">{language}</Badge>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
