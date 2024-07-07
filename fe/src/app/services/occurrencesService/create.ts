import { Nature, OccurrenceType } from "@/app/entities/Occurrence";
import { httpClient } from "../httpClient";
import { Occurrence } from "@/app/entities/Occurrence";

export interface CreateOccurrenceParams {
  date: string;
  isAbsent: boolean;
  type: OccurrenceType;
  nature: Nature;
  baseId: string;
  description?: string | undefined;
  createdAt: string;
  hour: string;
}

export type CreateResponse = Occurrence;

export const create = async (params: CreateOccurrenceParams) => {
  const { data } = await httpClient.post<CreateResponse>(
    "/occurrences",
    params
  );
  return data;
};
