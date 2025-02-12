import { httpClient } from "../httpClient";
import { EfficienciesFilters } from "./getAll";

export const pdfEfficiencyReport = async (filters: EfficienciesFilters) => {
  const { data } = await httpClient.get(`/efficiencies/pdf`, {
    responseType: "blob",
    params: filters,
  });

  return data;
};
