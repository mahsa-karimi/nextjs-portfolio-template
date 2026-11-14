import type { AppLocale } from "@/constants/locales";

export type ContentTranslation = {
  translations: Readonly<Record<AppLocale, ContentCopy>>;
};

export type ContentCopy = {
  title: string;
  description: string;
  imageAlt: string;
  role: string;
};

export type ContentImage = {
  src: string;
  alt?: string;
};

export type ContentLink = {
  kind: "live" | "github";
  href: string;
};

export type ContentDates = {
  startDate: string;
  endDate: string | null;
};
