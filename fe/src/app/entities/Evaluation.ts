import { ChecklistItem } from "./ChecklistItem";

export type Evaluation = {
  id: string;
  score: number;
  rating: number;
  checklistId: string;
  checklistItemId: string;
  comment?: string;
  files?: [] | { path: string }[];
  checklistItem: ChecklistItem;
};
