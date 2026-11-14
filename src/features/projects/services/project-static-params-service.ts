import { getProjectSlugs } from "@/features/projects/services/project-content-service";

export async function getProjectStaticParams() {
  return getProjectSlugs();
}
