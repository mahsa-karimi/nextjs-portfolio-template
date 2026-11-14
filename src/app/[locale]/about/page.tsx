import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { AboutPage } from "@/features/about/components/about-page";
import { createLocalizedMetadata } from "@/lib/seo/metadata";
import { routing } from "@/i18n/routing";

type AboutRouteProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: AboutRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Metadata.About" });
  return createLocalizedMetadata({
    locale,
    pathname: "/about",
    title: t("title"),
    description: t("description"),
  });
}

export default async function Page({ params }: AboutRouteProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return <AboutPage locale={locale} />;
}
