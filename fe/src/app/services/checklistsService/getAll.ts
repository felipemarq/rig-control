import { httpClient } from "../httpClient";
import { Checklist } from "@/app/entities/Checklist";

export type ChecklistsResponse = Array<Checklist>;

export type ChecklistsFilters = {
  startDate: string;
  endDate: string;
};

export const getAll = async (filters: ChecklistsFilters) => {
  const { data } = await httpClient.get<ChecklistsResponse>("/checklists", {
    params: filters,
  });

  return data;
};
