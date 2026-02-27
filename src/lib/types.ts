export interface WorkItem {
  id: string;
  workType: string;
  quantity: number;
}

export interface Project {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  workItems: WorkItem[];
  createdAt: string;
}

export type Role = "project_manager" | "project_engineer" | "store_keeper" | "procurement_officer" | "admin";

export interface User {
  email: string;
  name: string;
  role: Role;
}

export interface Material {
  name: string;
  quantity: number;
  unit: string;
}

export interface MaterialRequest {
  id: string;
  projectId: string;
  projectName: string;
  materials: Material[];
  status: "pending" | "approved" | "ordered" | "delivered";
  createdAt: string;
}
