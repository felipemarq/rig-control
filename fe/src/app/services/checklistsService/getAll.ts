import { httpClient } from "../httpClient";
import { Checklist } from "@/app/entities/Checklist";

export type ChecklistsResponse = Array<Checklist>;

export const getAll = async () => {
  const { data } = await httpClient.get<ChecklistsResponse>("/checklists");

  return data;
};
