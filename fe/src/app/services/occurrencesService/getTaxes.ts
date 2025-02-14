import { httpClient } from "../httpClient";

/* export interface usersFilters {
  contractId?: string;
} */

export type aggregatedTaxes = {
  month: number;
  count: number;
  accCount: number;
  tax: number;
}[];

export type OccurrencesTaxesResponse = {
  tarOccurrences: aggregatedTaxes;
  torOccurrences: aggregatedTaxes;
  notAbsentOccurrences: aggregatedTaxes;
  absentOccurrences: aggregatedTaxes;
  commutingOccurrences: aggregatedTaxes;
};

export type OccurrencesTaxesFilters = {
  startDate?: string;
  endDate?: string;
  baseId?: string;
  year: string;
};

export const getTaxes = async (filters: OccurrencesTaxesFilters) => {
  const { data } = await httpClient.get<OccurrencesTaxesResponse>(`/occurrences/taxes/`, {
    params: filters,
  });

  return data;
};
