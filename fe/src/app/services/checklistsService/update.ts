import { httpClient } from "../httpClient";

export interface CreateChecklistPlanParams {
  id: string;
  well: string;
  rigId: string;
  title: string;
  supervisor: string;
  team: string;
  date: string;
  evaluations: { id: string; checklistItemId: string; rating: number }[];
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

export const update = async ({ id, ...params }: CreateChecklistPlanParams) => {
  const { data } = await httpClient.patch<CreateChecklistResponse>(
    `/checklists/${id}`,
    params
  );
  return data;
};
