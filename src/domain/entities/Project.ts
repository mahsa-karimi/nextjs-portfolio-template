import type { AppLocale } from "@/constants/locales";
import type {
  ContentCopy,
  ContentDates,
  ContentImage,
  ContentLink,
} from "@/domain/entities/PortfolioContent";

export type Project = ContentCopy & {
  locale: AppLocale;
  slug: string;
  featured: boolean;
  images: readonly ContentImage[];
  links: readonly ContentLink[];
  techStack: readonly string[];
  dates: ContentDates;
};
