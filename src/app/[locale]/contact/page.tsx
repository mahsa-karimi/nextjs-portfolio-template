
import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { ContactPage } from "@/features/contact/components/contact-page";
import { createLocalizedMetadata } from "@/lib/seo/metadata";
import { routing } from "@/i18n/routing";

type ContactRouteProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ContactRouteProps): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const t = await getTranslations({
    locale,
    namespace: "Metadata.Contact",
  });

  return createLocalizedMetadata({
    locale,
    pathname: "/contact",
    title: t("title"),
    description: t("description"),
  });
}

export default async function Page({ params }: ContactRouteProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return <ContactPage />;
}
