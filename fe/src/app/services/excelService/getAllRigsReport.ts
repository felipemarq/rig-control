import { httpClient } from "../httpClient";

export type getAllRigsReportFilters = {
  startDate: string;
  endDate: string;
};

export const getAllRigsReport = async ({
  endDate,
  startDate,
}: getAllRigsReportFilters) => {
  const { data } = await httpClient.get(`/excel/`, {
    responseType: "blob",
    params: {
      startDate,
      endDate,
    },
  });

  return data;
};
