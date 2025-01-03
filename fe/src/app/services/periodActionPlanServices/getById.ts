import { httpClient } from "../httpClient";
import { PeriodActionPlan } from "@/app/entities/PeriodActionPlan";

/* export interface usersFilters {
  contractId?: string;
} */

/* export type OccurrenceFilters = {
  nature?: OccurenceNature;
  category?: OccurrenceCategory;
  severity?: OccurrenceSeverity;
  type?: OccurrenceType;
  uf?: UF;
  baseId?: string;
  startDate: string;
  endDate: string;
}; */

export type PeriodActionPlansResponse = PeriodActionPlan;

export const getById = async (periodActionPlanId: string) => {
  const { data } = await httpClient.get<PeriodActionPlansResponse>(
    `/period-action-plans/${periodActionPlanId}`
  );

  return data;
};
