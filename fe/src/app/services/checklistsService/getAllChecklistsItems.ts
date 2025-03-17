import { ChecklistItem } from "@/app/entities/ChecklistItem";
import { httpClient } from "../httpClient";

export type ChecklistItemsResponse = Array<ChecklistItem>;

export const getAllChecklistsItems = async () => {
  const { data } = await httpClient.get<ChecklistItemsResponse>("/checklist-items");

  return data;
};
