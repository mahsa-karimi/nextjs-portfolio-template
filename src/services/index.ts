import type { IContactRepository } from "@/domain/repositories/IContactRepository";
import type { IExperienceRepository } from "@/domain/repositories/IExperienceRepository";
import type { IProjectRepository } from "@/domain/repositories/IProjectRepository";
import { ApiContactRepository } from "@/repositories/ApiContactRepository";
import { LocalExperienceRepository } from "@/repositories/LocalExperienceRepository";
import { LocalProjectRepository } from "@/repositories/LocalProjectRepository";
import { ContactService } from "@/services/contactService";
import { ExperienceService } from "@/services/experienceService";
import { ProjectService } from "@/services/projectService";

// Composition root is the single place that wires implementations to service contracts.
const projectRepository: IProjectRepository = new LocalProjectRepository();
const experienceRepository: IExperienceRepository =
  new LocalExperienceRepository();
const contactRepository: IContactRepository = new ApiContactRepository();

export const projectService = new ProjectService(projectRepository);
export const experienceService = new ExperienceService(experienceRepository);
export const contactService = new ContactService(contactRepository);
