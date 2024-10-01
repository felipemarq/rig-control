import {
  OccurenceNature,
  Occurrence,
  OccurrenceCategory,
  OccurrenceType,
} from "@/app/entities/Occurrence";

import { httpClient } from "../httpClient";
import { UF } from "@/app/entities/Rig";
import { OccurrenceSeverity } from "@/app/entities/OccurrenceSeverity";

/* export interface usersFilters {
  contractId?: string;
} */

export type OccurrenceFilters = {
  nature?: OccurenceNature;
  category?: OccurrenceCategory;
  severity?: OccurrenceSeverity;
  type?: OccurrenceType;
  uf?: UF;
  baseId?: string;
  startDate: string;
  endDate: string;
};

export type OccurrencesResponse = Array<Occurrence>;

export const getAll = async (filters: OccurrenceFilters) => {
  const { data } = await httpClient.get<OccurrencesResponse>(`/occurrences/`, {
    params: filters,
  });

  return data;
};
