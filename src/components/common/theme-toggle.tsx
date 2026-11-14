"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";

const subscribeToMount = () => () => {};
const getMountedSnapshot = () => true;
const getServerMountedSnapshot = () => false;

const themeOptions = [
  { value: "light", Icon: Sun },
  { value: "dark", Icon: Moon },
  { value: "system", Icon: Monitor },
] as const;

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const t = useTranslations("Layout.ThemeToggle");
  const mounted = useSyncExternalStore(
    subscribeToMount,
    getMountedSnapshot,
    getServerMountedSnapshot,
  );

  return (
    <div
      role="group"
      aria-label={t("label")}
      className="border-border inline-flex items-center gap-1 rounded-lg border p-1"
    >
      {themeOptions.map(({ value, Icon }) => (
        <Button
          key={value}
          type="button"
          variant="ghost"
          size="sm"
          aria-pressed={mounted && theme === value}
          onClick={() => setTheme(value)}
          className="aria-pressed:bg-accent aria-pressed:text-accent-foreground gap-2"
        >
          <Icon aria-hidden="true" className="size-4" />
          <span>{t(value)}</span>
        </Button>
      ))}
    </div>
  );
}
