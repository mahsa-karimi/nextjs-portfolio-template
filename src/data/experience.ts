import type { AppLocale } from "@/constants/locales";
import type { ExperienceCopy } from "@/domain/entities/Experience";

export type ExperienceData = {
  id: string;
  organization: string;
  images: readonly { src: string }[];
  links: readonly { kind: "live" | "github"; href: string }[];
  techStack: readonly string[];
  translations: Readonly<Record<AppLocale, ExperienceCopy>>;
  dates: {
    startDate: string;
    endDate: string | null;
  };
};

// Localized source data remains separate from the locale-specific domain model.
const experienceRecords: readonly ExperienceData[] = [
  {
    id: "example-software",
    organization: "Example Software Studio",
    images: [],
    links: [],
    techStack: [
      "Your framework",
      "Your tools",
      "Your technologies",
      "Your methodology",
      "Your libraries",
    ],
    dates: { startDate: "2025-08-01", endDate: "2026-08-31" },
    translations: {
      en: {
        title: "Write your project name here",
        description:
          "Describe your project, your role, the problem you solved, and the result here.",
        imageAlt: "",
        role: "Write your role here",
        location: "Remote / Example location",
        highlights: [
          "Write the main responsibility or achievement for this project here.",
          "Add the frameworks, libraries, tools, technologies, and methodologies you used.",
          "Describe the result, impact, or lesson from this project here.",
        ],
      },
      fa: {
        title: "نام پروژه خود را اینجا بنویسید",
        description:
          "درباره پروژه، نقش خود، مسئله‌ای که حل کردید و نتیجه کار اینجا بنویسید.",
        imageAlt: "",
        role: "نقش خود را اینجا بنویسید",
        location: "مکان نمونه / دورکاری",
        highlights: [
          "مهم‌ترین مسئولیت یا دستاورد خود در این پروژه را اینجا بنویسید.",
          "فریم‌ورک‌ها، کتابخانه‌ها، ابزارها، فناوری‌ها و روش‌هایی را که استفاده کردید اضافه کنید.",
          "نتیجه، تأثیر یا آموخته خود از این پروژه را اینجا توضیح دهید.",
        ],
      },
      pt: {
        title: "Escreva aqui o nome do seu projeto",
        description:
          "Descreva aqui o projeto, a sua função, o problema resolvido e o resultado.",
        imageAlt: "",
        role: "Escreva aqui a sua função",
        location: "Localização de exemplo / remoto",
        highlights: [
          "Escreva aqui a principal responsabilidade ou conquista neste projeto.",
          "Adicione as frameworks, bibliotecas, ferramentas, tecnologias e metodologias utilizadas.",
          "Descreva aqui o resultado, impacto ou aprendizagem deste projeto.",
        ],
      },
    },
  }
];

export const experiences: readonly ExperienceData[] = experienceRecords;
