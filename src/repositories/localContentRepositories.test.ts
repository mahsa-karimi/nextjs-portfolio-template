import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";
import { LocalExperienceRepository } from "@/repositories/LocalExperienceRepository";
import { LocalProjectRepository } from "@/repositories/LocalProjectRepository";

describe("local content repositories", () => {
  it("adapts project source data into the requested locale", async () => {
    const repository = new LocalProjectRepository();
    const englishProject = await repository.getBySlug(
      "your-project",
      "en",
    );
    const persianProject = await repository.getBySlug(
      "your-project",
      "fa",
    );

    expect(englishProject?.title).toBe("Write your project name here");
    expect(persianProject?.title).toBe("نام پروژه خود را اینجا بنویسید");
    expect(persianProject?.locale).toBe("fa");
    expect(persianProject?.images[0]?.alt).toBe(
      "تصویر نمونه برای پروژه شما",
    );
    expect(persianProject).not.toHaveProperty("translations");
  });

  it("includes each CV project separately without inventing public links", () => {
    expect(projects).toHaveLength(1);
    expect(projects[0]?.slug).toBe("your-project");
    expect(projects.every(({ links }) => links.length === 0)).toBe(true);
    expect(
      projects.every(
        ({ translations }) =>
          translations.en.title &&
          translations.fa.title &&
          translations.pt.title,
      ),
    ).toBe(true);
  });

  it("adapts experience source data into the requested locale", async () => {
    const repository = new LocalExperienceRepository();
    const experience = await repository.getById("example-software", "pt");

    expect(experience).toMatchObject({
      locale: "pt",
      title: "Escreva aqui o nome do seu projeto",
      role: "Escreva aqui a sua função",
      organization: "Example Software Studio",
      location: "Localização de exemplo / remoto",
      highlights: expect.arrayContaining([
        expect.stringContaining("frameworks"),
      ]),
    });
    expect(experience).not.toHaveProperty("translations");
  });
});
