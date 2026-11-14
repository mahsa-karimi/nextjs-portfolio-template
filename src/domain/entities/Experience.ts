import type { AppLocale } from "@/constants/locales";
import type {
  ContentDates,
  ContentImage,
  ContentLink,
} from "@/domain/entities/PortfolioContent";

export type ExperienceCopy = {
  title: string;
  description: string;
  imageAlt: string;
  role: string;
  location: string;
  highlights: readonly string[];
};

export type Experience = ExperienceCopy & {
  locale: AppLocale;
  id: string;
  images: readonly ContentImage[];
  links: readonly ContentLink[];
  organization: string;
  techStack: readonly string[];
  dates: ContentDates;
};
