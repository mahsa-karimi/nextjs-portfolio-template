import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ProjectDetailPage } from "@/features/projects/components/project-detail-page";
import { getProject } from "@/features/projects/services/project-content-service";
import { getProjectStaticParams } from "@/features/projects/services/project-static-params-service";
import { createLocalizedMetadata } from "@/lib/seo/metadata";
import { routing } from "@/i18n/routing";

export const dynamicParams = false;

export async function generateStaticParams() {
  return getProjectStaticParams();
}

type ProjectRouteProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: ProjectRouteProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const project = await getProject(slug, locale);
  if (!project) {
    notFound();
  }

  return createLocalizedMetadata({
    locale,
    pathname: `/projects/${project.slug}`,
    title: project.title,
    description: project.description,
  });
}

export default async function Page({ params }: ProjectRouteProps) {
  const { locale, slug } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return <ProjectDetailPage locale={locale} slug={slug} />;
}
