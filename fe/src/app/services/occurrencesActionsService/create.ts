import { OccurrenceAction } from "@/app/entities/OccurrenceAction";
import { httpClient } from "../httpClient";

export interface CreateOccurrenceActionParams {
  occurrenceId: string;
  title: string;
  dueDate: string;
  responsible: string;
  isFinished: boolean;
  description?: string;
  responsibleEmail: string;
}

export type CreateOccurrenceActionResponse = OccurrenceAction;

export const create = async (body: CreateOccurrenceActionParams) => {
  const { data } = await httpClient.post<CreateOccurrenceActionResponse>(
    "/occurrence-actions",
    body
  );
  return data;
};
