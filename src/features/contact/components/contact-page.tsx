
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  ArrowUpRight,
  Mail,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const EMAIL = "you@example.com";

const LINKEDIN =
  "https://www.linkedin.com/in/your-profile/";

export function ContactPage() {
  const t = useTranslations("Contact");
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (
    value: string,
    type: string
  ) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(type);

      setTimeout(() => {
        setCopied(null);
      }, 2000);
    } catch {
      console.error("Failed to copy to clipboard");
    }
  };

  return (
    <section className="mx-auto w-full max-w-3xl space-y-10 px-6 py-20">
      {/* Header */}
      <div className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          {t("title")}
        </p>

        <p className="max-w-xl leading-relaxed text-muted-foreground">
          {t("description")}
        </p>
      </div>

      {/* Contact cards */}
      <div className="grid gap-4 sm:grid-cols-2">

        {/* Email */}
        <Card className="group transition-all duration-200 hover:border-primary hover:shadow-md">
          <CardContent className="flex items-center justify-between gap-3 p-6">
            <a
              href={`mailto:${EMAIL}`}
              className="flex min-w-0 flex-1 items-center gap-4 outline-none"
            >
              <div className="rounded-lg bg-primary/10 p-3 text-primary">
                <Mail className="size-5" />
              </div>

              <div className="min-w-0 space-y-1">
                <p className="font-semibold">{t("email")}</p>
                <p className="break-all text-sm text-muted-foreground">
                  {EMAIL}
                </p>
              </div>
            </a>

            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() => handleCopy(EMAIL, "email")}
                aria-label={t("copyEmail")}
                title={t("copyEmail")}
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {copied === "email" ? (
                  <Check className="size-4 text-green-600" />
                ) : (
                  <Copy className="size-4" />
                )}
              </button>

              <ArrowUpRight className="size-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        {/* LinkedIn */}
        <Card className="group transition-all duration-200 hover:border-primary hover:shadow-md">
          <CardContent className="flex items-center justify-between gap-3 p-6">
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-0 flex-1 items-center gap-4 outline-none"
            >
              <div className="rounded-lg bg-primary/10 p-3 text-primary">
                <ExternalLink className="size-5" />
              </div>

              <div className="min-w-0 space-y-1">
                <p className="font-semibold">LinkedIn</p>
                <p className="text-sm text-muted-foreground">
                  {t("linkedin")}
                </p>
              </div>
            </a>

            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() => handleCopy(LINKEDIN, "linkedin")}
                aria-label={t("copyLinkedin")}
                title={t("copyLinkedin")}
                className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {copied === "linkedin" ? (
                  <Check className="size-4 text-green-600" />
                ) : (
                  <Copy className="size-4" />
                )}
              </button>

              <ArrowUpRight className="size-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

      </div>
    </section>
  );
}
