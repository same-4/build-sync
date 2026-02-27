import { WorkItem } from "./types";

export interface CoefficientData {
  materials: { name: string; coefficient: number; unit: string }[];
  labor: { role: string; coefficient: number; unit: string }[];
}

export const WORK_TYPE_COEFFICIENTS: Record<string, CoefficientData> = {
  concrete: {
    materials: [
      { name: "Cement", coefficient: 7.5, unit: "bags" },
      { name: "Sand", coefficient: 0.45, unit: "m³" },
      { name: "Gravel", coefficient: 0.9, unit: "m³" },
      { name: "Water", coefficient: 180, unit: "liters" },
      { name: "Steel Rebar", coefficient: 80, unit: "kg" },
    ],
    labor: [
      { role: "Mason", coefficient: 0.5, unit: "man-days" },
      { role: "Helper", coefficient: 1.0, unit: "man-days" },
      { role: "Carpenter (Formwork)", coefficient: 0.3, unit: "man-days" },
    ],
  },
  brickwork: {
    materials: [
      { name: "Bricks", coefficient: 500, unit: "nos" },
      { name: "Cement", coefficient: 1.25, unit: "bags" },
      { name: "Sand", coefficient: 0.3, unit: "m³" },
    ],
    labor: [
      { role: "Mason", coefficient: 1.5, unit: "man-days" },
      { role: "Helper", coefficient: 1.5, unit: "man-days" },
    ],
  },
  plastering: {
    materials: [
      { name: "Cement", coefficient: 0.4, unit: "bags" },
      { name: "Sand", coefficient: 0.04, unit: "m³" },
    ],
    labor: [
      { role: "Mason", coefficient: 0.15, unit: "man-days" },
      { role: "Helper", coefficient: 0.15, unit: "man-days" },
    ],
  },
  painting: {
    materials: [
      { name: "Primer", coefficient: 0.1, unit: "liters" },
      { name: "Paint", coefficient: 0.25, unit: "liters" },
      { name: "Putty", coefficient: 0.5, unit: "kg" },
    ],
    labor: [
      { role: "Painter", coefficient: 0.08, unit: "man-days" },
      { role: "Helper", coefficient: 0.04, unit: "man-days" },
    ],
  },
  tiling: {
    materials: [
      { name: "Tiles", coefficient: 1.05, unit: "m²" },
      { name: "Cement", coefficient: 0.5, unit: "bags" },
      { name: "Sand", coefficient: 0.03, unit: "m³" },
      { name: "Tile Adhesive", coefficient: 4, unit: "kg" },
    ],
    labor: [
      { role: "Tiler", coefficient: 0.2, unit: "man-days" },
      { role: "Helper", coefficient: 0.2, unit: "man-days" },
    ],
  },
  excavation: {
    materials: [],
    labor: [
      { role: "Excavator Operator", coefficient: 0.05, unit: "man-days" },
      { role: "Helper", coefficient: 0.3, unit: "man-days" },
    ],
  },
};

export const WORK_TYPES = Object.keys(WORK_TYPE_COEFFICIENTS).map((key) => ({
  value: key,
  label: key.charAt(0).toUpperCase() + key.slice(1),
}));

export function calculateMaterials(workItems: WorkItem[]) {
  const materialTotals: Record<string, { quantity: number; unit: string }> = {};

  workItems.forEach((item) => {
    const coefficients = WORK_TYPE_COEFFICIENTS[item.workType];
    if (!coefficients) return;

    coefficients.materials.forEach((mat) => {
      const key = mat.name;
      const required = item.quantity * mat.coefficient;
      if (materialTotals[key]) {
        materialTotals[key].quantity += required;
      } else {
        materialTotals[key] = { quantity: required, unit: mat.unit };
      }
    });
  });

  return Object.entries(materialTotals).map(([name, data]) => ({
    name,
    quantity: Math.ceil(data.quantity * 100) / 100,
    unit: data.unit,
  }));
}

export function calculateManpower(workItems: WorkItem[]) {
  const laborTotals: Record<string, { days: number; unit: string }> = {};

  workItems.forEach((item) => {
    const coefficients = WORK_TYPE_COEFFICIENTS[item.workType];
    if (!coefficients) return;

    coefficients.labor.forEach((lab) => {
      const key = lab.role;
      const required = item.quantity * lab.coefficient;
      if (laborTotals[key]) {
        laborTotals[key].days += required;
      } else {
        laborTotals[key] = { days: required, unit: lab.unit };
      }
    });
  });

  return Object.entries(laborTotals).map(([role, data]) => ({
    role,
    days: Math.ceil(data.days * 100) / 100,
    unit: data.unit,
  }));
}
