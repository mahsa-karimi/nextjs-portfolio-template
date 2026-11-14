"use client";

import { CodeXml, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { LanguageSwitcher } from "@/components/common/language-switcher";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";

const navigationItems = [
  { label: "home", href: "/" },
  { label: "about", href: "/about" },
  { label: "experience", href: "/experience" },
  { label: "projects", href: "/projects" },
  { label: "contact", href: "/contact" },
] as const;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations("Layout.Header");
  const pathname = usePathname();

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  function renderNavigation(onNavigate?: () => void) {
    return (
      <ul className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2">
        {navigationItems.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={pathname === href ? "page" : undefined}
              className="text-muted-foreground aria-[current=page]:bg-primary/20 aria-[current=page]:text-foreground aria-[current=page]:font-semibold hover:bg-accent hover:text-accent-foreground focus-visible:outline-ring block rounded-full px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {t(label)}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-40 border-b backdrop-blur">
      <Container>
        <div className="flex min-h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="focus-visible:outline-ring inline-flex shrink-0 items-center gap-2 rounded-sm text-lg font-bold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <CodeXml aria-hidden="true" className="size-6 text-primary" />
            {t("brand")}
          </Link>

          <nav aria-label={t("primaryNavigation")} className="hidden xl:block">
            {renderNavigation()}
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          <Button
            ref={menuButtonRef}
            type="button"
            variant="outline"
            size="icon"
            className="xl:hidden"
            aria-label={t(isMenuOpen ? "closeMenu" : "openMenu")}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? (
              <X aria-hidden="true" />
            ) : (
              <Menu aria-hidden="true" />
            )}
          </Button>
        </div>

        <div
          id="mobile-navigation"
          hidden={!isMenuOpen}
          className="border-border border-t py-4 xl:hidden"
        >
          <nav aria-label={t("mobileNavigation")}>
            {renderNavigation(() => setIsMenuOpen(false))}
          </nav>
          <div className="border-border mt-4 flex flex-col items-start gap-4 border-t pt-4">
            <LanguageSwitcher onNavigate={() => setIsMenuOpen(false)} />
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}
