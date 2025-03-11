import { httpClient } from "../httpClient";

export interface CreateChecklistPlanParams {
  well: string;
  rigId: string;
  title: string;
  supervisor: string;
  team: string;
  date: string;
  evaluations: { checklistItemId: string; rating: number }[];
}

export type CreateChecklistResponse = {
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
};

export const create = async (params: CreateChecklistPlanParams) => {
  const { data } = await httpClient.post<CreateChecklistResponse>("/checklists", params);
  return data;
};
