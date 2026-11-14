import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/constants/locales";
import { env } from "@/config/env";

type LocalizedMetadataOptions = {
  locale: AppLocale;
  pathname: string;
  title: string;
  description: string;
};

export function getLocalizedPathname(
  locale: AppLocale,
  pathname: string,
): string {
  const normalizedPath =
    pathname === "/" ? "" : `/${pathname.replace(/^\/+/, "")}`;
  return `/${locale}${normalizedPath}`;
}

export function getLocaleAlternates(pathname: string) {
  const languages: Record<AppLocale, string> = {
    en: getLocalizedPathname("en", pathname),
    fa: getLocalizedPathname("fa", pathname),
    pt: getLocalizedPathname("pt", pathname),
  };

  return {
    ...languages,
    "x-default": getLocalizedPathname("en", pathname),
  };
}

export async function createLocalizedMetadata({
  locale,
  pathname,
  title,
  description,
}: LocalizedMetadataOptions): Promise<Metadata> {
  const localizedPathname = getLocalizedPathname(locale, pathname);
  const [siteName, openGraphText] = await Promise.all([
    getTranslations({ locale, namespace: "Metadata" }),
    getTranslations({ locale, namespace: "OpenGraph" }),
  ]);
  const openGraphImage = new URL(
    getLocalizedPathname(locale, "/opengraph-image"),
    env.NEXT_PUBLIC_SITE_URL,
  ).toString();
  const openGraphLocale = {
    en: "en_US",
    fa: "fa_IR",
    pt: "pt_BR",
  } satisfies Record<AppLocale, string>;

  return {
    title,
    description,
    alternates: {
      canonical: localizedPathname,
      languages: getLocaleAlternates(pathname),
    },
    openGraph: {
      title,
      description,
      url: localizedPathname,
      siteName: siteName("title"),
      locale: openGraphLocale[locale],
      type: "website",
      images: [
        {
          url: openGraphImage,
          width: 1200,
          height: 630,
          alt: openGraphText("alt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: openGraphImage, alt: openGraphText("alt") }],
    },
  };
}
