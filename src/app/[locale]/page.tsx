import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { createLocalizedMetadata } from "@/lib/seo/metadata";
import { HomePage } from "@/features/home/components/home-page";
import { routing } from "@/i18n/routing";

type HomeRouteProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: HomeRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Metadata.Home" });
  return createLocalizedMetadata({
    locale,
    pathname: "/",
    title: t("title"),
    description: t("description"),
  });
}

export default async function Page({ params }: HomeRouteProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return <HomePage locale={locale} />;
}
