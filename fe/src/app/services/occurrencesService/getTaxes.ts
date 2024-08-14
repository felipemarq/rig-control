import { httpClient } from "../httpClient";

/* export interface usersFilters {
  contractId?: string;
} */

export type aggregatedTaxes = {
  month: number;
  count: number;
  tax: number;
}[];

export type OccurrencesTaxesResponse = {
  tarOccurrences: aggregatedTaxes;
  torOccurrences: aggregatedTaxes;
  notAbsentOccurrences: aggregatedTaxes;
  absentOccurrences: aggregatedTaxes;
  commutingOccurrences: aggregatedTaxes;
};

export const getTaxes = async (baseId?: string) => {
  const { data } = await httpClient.get<OccurrencesTaxesResponse>(
    `/occurrences/taxes/${baseId}`
  );

  return data;
};
