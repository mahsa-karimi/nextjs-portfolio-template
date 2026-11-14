import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ProjectsPage } from "@/features/projects/components/projects-page";
import { createLocalizedMetadata } from "@/lib/seo/metadata";
import { routing } from "@/i18n/routing";

type ProjectsRouteProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ProjectsRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Metadata.Projects" });
  return createLocalizedMetadata({
    locale,
    pathname: "/projects",
    title: t("title"),
    description: t("description"),
  });
}

export default async function Page({ params }: ProjectsRouteProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return <ProjectsPage locale={locale} />;
}
