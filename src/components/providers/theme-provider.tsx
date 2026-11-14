"use client";

import { useLocale } from "next-intl";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useLayoutEffect, type ReactNode } from "react";

type ThemeProviderProps = {
  children: ReactNode;
};

function LocaleThemeSync() {
  const locale = useLocale();
  const { resolvedTheme } = useTheme();

  useLayoutEffect(() => {
    if (resolvedTheme !== "light" && resolvedTheme !== "dark") return;

    // Locale navigation can replace the root classes without changing the theme.
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolvedTheme);
    root.style.colorScheme = resolvedTheme;
  }, [locale, resolvedTheme]);

  return null;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LocaleThemeSync />
      {children}
    </NextThemesProvider>
  );
}
