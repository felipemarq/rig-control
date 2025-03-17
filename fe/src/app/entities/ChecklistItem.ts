export type ChecklistItem = {
  id: string;
  description: string;
  weight: number;
  category: ChecklistItemCategory;
};

export enum ChecklistItemCategory {
  SMS = "SMS",
}
