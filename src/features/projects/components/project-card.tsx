import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Project } from "@/domain/entities/Project";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations("Projects");
  const coverImage = project.images[0];

  return (
    <Card className="p-0 group border-border bg-card hover:border-primary/50 h-full overflow-hidden shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      {coverImage ? (
        <Link
          href={`/projects/${project.slug}`}
          aria-label={t("viewProject", { title: project.title })}
          className="focus-visible:outline-ring relative block overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src={coverImage.src}
              alt={coverImage.alt ?? project.imageAlt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain"
            />
          </div>
        </Link>
      ) : null}
      <CardHeader>
        <CardTitle className="text-lg font-bold">{project.title}</CardTitle>
        <CardDescription className="leading-relaxed">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {project.techStack.map((technology) => (
          <Badge key={technology} variant="secondary">
            {technology}
          </Badge>
        ))}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-3">
        <Link
          href={`/projects/${project.slug}`}
          className="focus-visible:outline-ring rounded-sm text-sm font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          {t("details")}
        </Link>
        {project.links.map(({ kind, href }) => (
          <a
            key={kind}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-visible:outline-ring rounded-sm text-sm font-medium underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {t(kind)}
            <span className="sr-only">
              {" "}
              {t("opensInNewTab", { title: project.title })}
            </span>
          </a>
        ))}
      </CardFooter>
    </Card>
  );
}
