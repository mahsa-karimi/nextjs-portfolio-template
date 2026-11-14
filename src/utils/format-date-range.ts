import type { AppLocale } from "@/constants/locales";
import type { ContentDates } from "@/domain/entities/PortfolioContent";

export function formatDateRange(
  dates: ContentDates,
  locale: AppLocale,
  presentLabel: string,
): string {
  const formatDate = (date: string) =>
    new Intl.DateTimeFormat(locale, {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${date}T00:00:00.000Z`));

  return `${formatDate(dates.startDate)} – ${
    dates.endDate ? formatDate(dates.endDate) : presentLabel
  }`;
}
