import type { Metadata } from "next";
import { Geist, Vazirmatn } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Container } from "@/components/layout/container";
import { env } from "@/config/env";
import { routing } from "@/i18n/routing";
import "../globals.css";

const latinFont = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: false,
});

const persianFont = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  preload: false,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
  };
}

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const fontStyle = {
    "--font-portfolio":
      locale === "fa" ? "var(--font-vazirmatn)" : "var(--font-geist-sans)",
  } as CSSProperties;

  return (
    <html
      lang={locale}
      dir={locale === "fa" ? "rtl" : "ltr"}
      className={`${latinFont.variable} ${persianFont.variable} h-full antialiased`}
      style={fontStyle}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <ThemeProvider>
            <Header />
            <Container as="main" className="flex flex-1 flex-col">
              {children}
            </Container>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
