import { PeriodClassification } from "@/app/entities/PeriodClassification";
import { OrderByType } from "../../entities/OrderBy";
import { Period } from "../../entities/Period";
import { PeriodType } from "../../entities/PeriodType";
import { RepairClassification } from "../../entities/RepairClassification";
import { httpClient } from "../httpClient";

export interface GetByPeriodTypeFilters {
  rigId: string;
  periodType: PeriodType[];
  periodClassification: PeriodClassification[];
  repairClassification: RepairClassification[];
  orderBy: OrderByType;
  startDate: string;
  endDate: string;
  pageSize: string;
  pageIndex: string;
  searchTerm?: string;
}

export type GetByPeriodIdResponse = { data: Array<Period>; totalItems: number };

export const getByPeriodType = async (filters: GetByPeriodTypeFilters) => {
  const params = new URLSearchParams();
  if (filters.rigId) {
    params.append("rigId", filters.rigId);
  }

  if (filters.orderBy) {
    params.append("orderBy", filters.orderBy);
  }

  if (filters.startDate) {
    params.append("startDate", filters.startDate);
  }

  if (filters.endDate) {
    params.append("endDate", filters.endDate);
  }

  if (filters.pageSize) {
    params.append("pageSize", filters.pageSize);
  }

  if (filters.pageIndex) {
    params.append("pageIndex", filters.pageIndex);
  }

  if (filters.searchTerm) {
    params.append("searchTerm", filters.searchTerm);
  }

  filters.periodType?.forEach((periodType) => {
    params.append("periodType", periodType);
  });

  filters.periodClassification?.forEach((periodClassification) => {
    params.append("periodClassification", periodClassification);
  });

  filters.repairClassification?.forEach((repairClassification) => {
    params.append("repairClassification", repairClassification);
  });

  const { data } = await httpClient.get<GetByPeriodIdResponse>("/periods", {
    params: filters,
  });

  return data;
};
