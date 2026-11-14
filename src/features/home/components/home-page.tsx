import { ArrowUpRight, ArrowRight, MapPin, GraduationCap, Layers3, Send, UserRound } from "lucide-react";
import { FrameworkLogos } from "./framework-logos";
import { getTranslations } from "next-intl/server";
import type { AppLocale } from "@/constants/locales";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/features/projects/components/project-card";
import { getFeaturedProjects } from "@/features/projects/services/project-content-service";
import { getHomeMessages } from "@/features/home/services/home-content-service";
import { Link } from "@/i18n/navigation";

type HomePageProps = {
  locale: AppLocale;
};

export async function HomePage({ locale }: HomePageProps) {
  const [t, projects, about] = await Promise.all([
    getHomeMessages(locale),
    getFeaturedProjects(locale),
    getTranslations({ locale, namespace: "About" }),
  ]);
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="flex flex-1 flex-col gap-12 py-10 text-start sm:gap-16 sm:py-14">
      <section aria-labelledby="home-title" className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(260px,0.75fr)] lg:gap-12">
        <div className="space-y-6">
          <p className="inline-flex max-w-full rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold text-foreground sm:text-sm">
            {t("eyebrow")}
          </p>
          <div className="max-w-3xl space-y-5">
            <h1 id="home-title" className="text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              {t("title")}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{t("description")}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button nativeButton={false} size="lg" className="rounded-xl font-semibold shadow-sm transition-transform hover:-translate-y-0.5" render={<Link href="/projects" />}>
              {t("projectsCta")} <ArrowRight aria-hidden="true" className="ms-1 size-4" />
            </Button>
            <Button nativeButton={false} size="lg" variant="outline" className="rounded-xl" render={<Link href="/about" />}>
              {t("aboutCta")}
            </Button>
          </div>
        </div>
        <FrameworkLogos />
      </section>

      <section aria-labelledby="home-about-title" className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(220px,0.85fr)] md:items-center">
          <div className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary"><UserRound aria-hidden="true" className="size-6" /></span>
            <div className="space-y-3">
              <h2 id="home-about-title" className="text-2xl font-bold tracking-tight">{t("aboutTitle")}</h2>
              <p className="leading-relaxed text-muted-foreground">{t("aboutDescription")}</p>
            </div>
          </div>
          <div className="space-y-4 border-t border-border pt-6 text-sm md:border-s md:border-t-0 md:ps-8 md:pt-0">
            <div className="flex items-center gap-3"><MapPin aria-hidden="true" className="size-5 shrink-0 text-primary" /><span>{about("location")}</span></div>
            <div className="flex items-center gap-3"><GraduationCap aria-hidden="true" className="size-5 shrink-0 text-primary" /><span>{about("education.title")}</span></div>
          </div>
        </div>
      </section>

      <section aria-labelledby="featured-title" className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 id="featured-title" className="flex items-center gap-3 text-2xl font-bold tracking-tight">
              <Layers3 aria-hidden="true" className="size-6 text-primary" />{t("featuredTitle")}
            </h2>
            <p className="text-muted-foreground">{t("featuredDescription")}</p>
          </div>
          <Link href="/projects" className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-4 py-2 text-sm font-semibold transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
            {t("allProjects")} <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {featuredProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-title" className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex max-w-2xl items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary"><Send aria-hidden="true" className="size-6" /></span>
            <div className="space-y-2">
              <h2 id="contact-title" className="text-2xl font-bold tracking-tight">{t("contactTitle")}</h2>
              <p className="text-muted-foreground">{t("contactDescription")}</p>
            </div>
          </div>
          <Button nativeButton={false} size="lg" className="shrink-0 rounded-xl font-semibold" render={<Link href="/contact" />}>
            {t("contactCta")} <ArrowRight aria-hidden="true" className="ms-1 size-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
