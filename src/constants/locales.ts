export const SUPPORTED_LOCALES = ["en", "pt", "fa"] as const;

export type AppLocale = (typeof SUPPORTED_LOCALES)[number];
