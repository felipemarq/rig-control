import { Occurrence } from "@/app/entities/Occurrence";

import { httpClient } from "../httpClient";

/* export interface usersFilters {
  contractId?: string;
} */

export type OccurrencesResponse = Array<Occurrence>;

export const getAll = async (/* filters: usersFilters */) => {
  const { data } = await httpClient.get<OccurrencesResponse>(
    `/occurrences/` /* {
    params: filters,
  } */
  );

  return data;
};
