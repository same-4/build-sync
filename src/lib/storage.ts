import { Project, MaterialRequest } from "./types";

const STORAGE_KEY = "buildsync_projects";
const MR_STORAGE_KEY = "buildsync_mrs";

export function getProjects(): Project[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function getProject(id: string): Project | undefined {
  return getProjects().find((p) => p.id === id);
}

export function saveProject(project: Project): void {
  const projects = getProjects();
  const idx = projects.findIndex((p) => p.id === project.id);
  if (idx >= 0) {
    projects[idx] = project;
  } else {
    projects.push(project);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function deleteProject(id: string): void {
  const projects = getProjects().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function getMaterialRequests(): MaterialRequest[] {
  const data = localStorage.getItem(MR_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function getMaterialRequestsForProject(projectId: string): MaterialRequest[] {
  return getMaterialRequests().filter(mr => mr.projectId === projectId);
}

export function saveMaterialRequest(mr: MaterialRequest): void {
  const mrs = getMaterialRequests();
  const idx = mrs.findIndex((m) => m.id === mr.id);
  if (idx >= 0) {
    mrs[idx] = mr;
  } else {
    mrs.push(mr);
  }
  localStorage.setItem(MR_STORAGE_KEY, JSON.stringify(mrs));
}
