"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type LanguageSwitcherProps = {
  onNavigate?: () => void;
};

export function LanguageSwitcher({ onNavigate }: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("LanguageSwitcher");

  return (
    <nav aria-label={t("label")} className="flex flex-wrap gap-3">
      {routing.locales.map((targetLocale) => (
        <Link
          key={targetLocale}
          href={pathname}
          locale={targetLocale}
          onClick={onNavigate}
          aria-current={targetLocale === locale ? "page" : undefined}
          className="focus-visible:outline-ring rounded-md py-2 ps-3 pe-3 text-sm  underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 aria-[current=page]:font-bold aria-[current=page]:underline"
        >
          {t(targetLocale)}
        </Link>
      ))}
    </nav>
  );
}
