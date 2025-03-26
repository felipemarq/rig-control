export type ChecklistItem = {
  id: string;
  number: number;
  description: string;
  weight: number;
  category: ChecklistItemCategory;
};

export enum ChecklistItemCategory {
  SMS = "SMS",
  SGI = "SGI",
  OP = "OP",
  INT = "INT",
  MANT = "MANT",
  INT_MANT = "INT_MANT",
  LOG = "LOG",
}
