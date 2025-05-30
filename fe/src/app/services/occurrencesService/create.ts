import {
  OccurenceNature,
  OccurrenceCategory,
  OccurrenceType,
} from "@/app/entities/Occurrence";
import { httpClient } from "../httpClient";
import { Occurrence } from "@/app/entities/Occurrence";
import { UF } from "@/app/entities/Rig";
import { OccurrenceSeverity } from "@/app/entities/OccurrenceSeverity";

export interface CreateOccurrenceParams {
  date: string;
  title: string;
  isAbsent: boolean;
  type: OccurrenceType;
  nature: OccurenceNature;
  baseId: string;
  clientId: string;
  description?: string | undefined;
  createdAt: string;
  updatedAt?: string;
  hour: string;
  category?: OccurrenceCategory;
  severity?: OccurrenceSeverity;
  state: UF;
}

export type CreateResponse = Occurrence;

export const create = async (params: CreateOccurrenceParams) => {
  const { data } = await httpClient.post<CreateResponse>(
    "/occurrences",
    params
  );
  return data;
};
