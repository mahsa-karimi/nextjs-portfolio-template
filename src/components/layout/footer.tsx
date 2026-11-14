import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";

export function Footer() {
  const t = useTranslations("Layout.Footer");

  return (
    <footer className="border-border border-t py-6">
      <Container>
        <p className="text-muted-foreground text-sm">{t("note")}</p>
      </Container>
    </footer>
  );
}
