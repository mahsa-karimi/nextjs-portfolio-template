import Image from "next/image";
import { notFound } from "next/navigation";
import type { AppLocale } from "@/constants/locales";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProject } from "@/features/projects/services/project-content-service";
import { getProjectDetailMessages } from "@/features/projects/services/project-messages-service";
import { Link } from "@/i18n/navigation";

type ProjectDetailPageProps = {
  locale: AppLocale;
  slug: string;
};

export async function ProjectDetailPage({
  locale,
  slug,
}: ProjectDetailPageProps) {
  const [project, t] = await Promise.all([
    getProject(slug, locale),
    getProjectDetailMessages(locale),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <article className="flex flex-1 flex-col gap-10 py-4 text-start">
      <header className="max-w-3xl space-y-4">
        {/* <Button
          nativeButton={false}
          variant="ghost"
          className="w-fit"
          render={<Link href="/projects" />}
        >
          {t("backToProjects")}
        </Button> */}
        <p className="text-muted-foreground text-sm">
          {t("periodHint")}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">
          {project.title}
        </h1>
        <p className="text-muted-foreground text-lg">{project.description}</p>
        <p className="font-medium">{project.role}</p>
      </header>

      <section aria-label={t("gallery")} className="grid gap-6">
        {project.images.map((image, index) => (
          <Card key={image.src} className="overflow-hidden p-0">
            <div className="relative aspect-[3/2]">
              <Image
                src={image.src}
                alt={image.alt ?? project.imageAlt}
                priority={index === 0}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-contain"
              />
            </div>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)]">
        <Card>
          <CardHeader>
            <CardTitle>{t("aboutProject")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("technologies")}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {project.techStack.map((technology) => (
              <Badge key={technology} variant="secondary">
                {technology}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </section>

      {project.links.length > 0 ? (
        <nav aria-label={t("projectLinks")} className="flex flex-wrap gap-3">
          {project.links.map(({ kind, href }) => (
            <Button
              key={kind}
              nativeButton={false}
              variant="outline"
              render={
                <a href={href} target="_blank" rel="noopener noreferrer" />
              }
            >
              {t(kind)}
              <span className="sr-only">
                {" "}
                {t("opensInNewTab", { title: project.title })}
              </span>
            </Button>
          ))}
        </nav>
      ) : null}
    </article>
  );
}
