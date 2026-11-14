import type { ContentTranslation } from "@/domain/entities/PortfolioContent";

export type ProjectData = ContentTranslation & {
  slug: string;
  featured: boolean;
  images: readonly { src: string }[];
  links: readonly { kind: "live" | "github"; href: string }[];
  techStack: readonly string[];
  dates: {
    startDate: string;
    endDate: string | null;
  };
};

// Localized source data remains separate from the locale-specific domain model.
export const projects: readonly ProjectData[] = [
  {
    slug: "your-project",
    featured: true,
    images: [{ src: "/images/projects/work-sample.svg" }],
    links: [],
    techStack: [
      "Your framework",
      "Your library",
      "Your tools",
      "Your technologies",
      "Your methodology",
    ],
    dates: { startDate: "2025-08-01", endDate: "2026-08-31" },
    translations: {
      en: {
        title: "Write your project name here",
        description:
          "Write your project description here. Explain the problem, your contribution, the technologies and methodologies you used, and the result.",
        imageAlt: "Placeholder artwork for your project",
        role: "Write your role here",
      },
      fa: {
        title: "نام پروژه خود را اینجا بنویسید",
        description:
          "توضیحات پروژه را اینجا بنویسید: مسئله، نقش شما، فناوری‌ها و روش‌هایی که استفاده کردید و نتیجه کار.",
        imageAlt: "تصویر نمونه برای پروژه شما",
        role: "نقش خود را اینجا بنویسید",
      },
      pt: {
        title: "Escreva aqui o nome do seu projeto",
        description:
          "Escreva aqui a descrição do projeto: o problema, a sua contribuição, as tecnologias e metodologias utilizadas e o resultado.",
        imageAlt: "Imagem provisória do seu projeto",
        role: "Escreva aqui a sua função",
      },
    },
  }
];
