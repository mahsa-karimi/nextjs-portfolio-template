import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import type { AppLocale } from "@/constants/locales";
import { SUPPORTED_LOCALES } from "@/constants/locales";
import enMessages from "../../../messages/en.json";
import faMessages from "../../../messages/fa.json";
import ptMessages from "../../../messages/pt.json";

const openGraphMessages = {
  en: enMessages.OpenGraph,
  pt: ptMessages.OpenGraph,
  fa: faMessages.OpenGraph,
} satisfies Record<AppLocale, typeof enMessages.OpenGraph>;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type OpenGraphImageProps = {
  params: Promise<{ locale: string }>;
};

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { locale } = await params;

  if (!hasLocale(SUPPORTED_LOCALES, locale)) {
    notFound();
  }

  const text = openGraphMessages[locale];
  const fonts =
    locale === "fa"
      ? [
          {
            name: "Vazirmatn",
            data: await readFile(
              join(process.cwd(), "public/fonts/Vazirmatn-Regular.ttf"),
            ),
            weight: 400 as const,
            style: "normal" as const,
          },
        ]
      : undefined;

  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background:
          "linear-gradient(135deg, #f8fafc 0%, #dbeafe 52%, #e0e7ff 100%)",
        color: "#0f172a",
        direction: locale === "fa" ? "rtl" : "ltr",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        padding: "80px",
        width: "100%",
        fontFamily: locale === "fa" ? "Vazirmatn" : "sans-serif",
      }}
    >
      <div
        style={{
          alignItems: locale === "fa" ? "flex-end" : "flex-start",
          border: "2px solid rgba(15, 23, 42, 0.14)",
          borderRadius: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          padding: "64px 72px",
          textAlign: locale === "fa" ? "right" : "left",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#475569",
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {text.eyebrow}
        </div>
        <div
          style={{
            fontSize: 68,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
          }}
        >
          {text.title}
        </div>
        <div style={{ color: "#475569", fontSize: 30 }}>{text.description}</div>
      </div>
    </div>,
    {
      ...size,
      fonts,
    },
  );
}
