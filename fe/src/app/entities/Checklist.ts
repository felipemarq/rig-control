import { ChecklistItem } from "./ChecklistItem";
import { Rig } from "./Rig";

export type Checklist = {
  id: string;
  wellId: string;
  rigId: string;
  userId: string;
  goal: number;
  score: number;
  totalPoints: number;
  totalWeight: number;
  title: string;
  supervisor: string;
  team: string;
  date: string;
  createdAt: string;
  rig: Rig;
  well: {
    id: string;
    name: string;
    contractId?: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
  evaluations: {
    id: string;
    score: number;
    rating: number;
    checklistId: string;
    checklistItemId: string;
    comment?: string;
    files?: [] | { path: string }[];
    checklistItem: ChecklistItem;
  }[];
};
