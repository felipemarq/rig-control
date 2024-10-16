import { httpClient } from "../httpClient";

export const excelPeriodsReport = async (efficiencyId: string) => {
  const { data } = await httpClient.get(`/efficiencies/excel/${efficiencyId}`, {
    responseType: "blob",
  });

  return data;
};
