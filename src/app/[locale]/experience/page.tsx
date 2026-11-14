import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ExperiencePage } from "@/features/experience/components/experience-page";
import { createLocalizedMetadata } from "@/lib/seo/metadata";
import { routing } from "@/i18n/routing";

type ExperienceRouteProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ExperienceRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Metadata.Experience" });
  return createLocalizedMetadata({
    locale,
    pathname: "/experience",
    title: t("title"),
    description: t("description"),
  });
}

export default async function Page({ params }: ExperienceRouteProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return <ExperiencePage locale={locale} />;
}
