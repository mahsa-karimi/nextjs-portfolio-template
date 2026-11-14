import { describe, expect, it, vi } from "vitest";
import type { Project } from "@/domain/entities/Project";
import type { IProjectRepository } from "@/domain/repositories/IProjectRepository";
import { ProjectService } from "@/services/projectService";

describe("ProjectService", () => {
  it("delegates project listing to its repository contract", async () => {
    const projects: readonly Project[] = [];
    const repository: IProjectRepository = {
      getAll: vi.fn().mockResolvedValue(projects),
      getBySlug: vi.fn().mockResolvedValue(projects[0]),
    };
    const service = new ProjectService(repository);

    await expect(service.getAllProjects("en")).resolves.toBe(projects);
    expect(repository.getAll).toHaveBeenCalledOnce();
    expect(repository.getAll).toHaveBeenCalledWith("en");
  });
});
