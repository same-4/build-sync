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

export interface User {
  email: string;
  name: string;
  role: "project_manager";
}
