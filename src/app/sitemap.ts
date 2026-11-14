import type { MetadataRoute } from "next";
import { env } from "@/config/env";
import { SUPPORTED_LOCALES } from "@/constants/locales";
import { getProjectSlugs } from "@/features/projects/services/project-content-service";
import { getLocaleAlternates, getLocalizedPathname } from "@/lib/seo/metadata";

const staticPaths = [
  { pathname: "/", priority: 1 },
  { pathname: "/about", priority: 0.7 },
  { pathname: "/experience", priority: 0.7 },
  { pathname: "/projects", priority: 0.9 },
  { pathname: "/contact", priority: 0.5 },
] as const;

function getAbsoluteUrl(pathname: string): string {
  return new URL(pathname, env.NEXT_PUBLIC_SITE_URL).toString();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectSlugs = await getProjectSlugs();
  const pages = [
    ...staticPaths,
    ...projectSlugs.map(({ slug }) => ({
      pathname: `/projects/${slug}`,
      priority: 0.8,
    })),
  ];

  return pages.flatMap(({ pathname, priority }) =>
    SUPPORTED_LOCALES.map((locale) => {
      const localizedPathname = getLocalizedPathname(locale, pathname);
      const alternatePaths = getLocaleAlternates(pathname);

      return {
        url: getAbsoluteUrl(localizedPathname),
        alternates: {
          languages: Object.fromEntries(
            Object.entries(alternatePaths).map(([language, path]) => [
              language,
              getAbsoluteUrl(path),
            ]),
          ),
        },
        changeFrequency: "monthly",
        priority,
      };
    }),
  );
}
