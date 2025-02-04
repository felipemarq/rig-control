import { httpClient } from "../httpClient";

export type AverageResponse = Array<{ month: string; avg: number }>;

export type EfficienciesAverageFilters = {
  rigId: string;
  year: string | number;
};

export const getAverage = async (filters: EfficienciesAverageFilters) => {
  console.log("filters", filters);
  const { data } = await httpClient.get<AverageResponse>(
    `/efficiencies/average/${filters.rigId}`,
    {
      params: { year: filters.year },
    }
  );

  return data;
};
