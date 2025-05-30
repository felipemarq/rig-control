import { PeriodType } from "@/app/entities/PeriodType";
import { httpClient } from "../httpClient";
import { RepairClassification } from "@/app/entities/RepairClassification";
import { OrderByType } from "@/app/entities/OrderBy";
import { PeriodClassification } from "@/app/entities/PeriodClassification";

export type getAllRigsReportFilters = {
  rigId?: string;
  periodType: PeriodType[];
  periodClassification: PeriodClassification[];
  repairClassification: RepairClassification[];
  orderBy: OrderByType;
  startDate: string;
  endDate: string;
  searchTerm?: string;
};

export const getPeriodsReport = async (params: getAllRigsReportFilters) => {
  const { data } = await httpClient.get(`/excel/periods`, {
    responseType: "blob",
    params,
  });

  return data;
};
