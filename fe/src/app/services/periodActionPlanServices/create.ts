import { httpClient } from "../httpClient";
import { PeriodActionPlan } from "@/app/entities/PeriodActionPlan";

export interface CreatePeriodActionPlanParams {
  periodId: string;
  title: string;
  rigId: string;
  finishedAt?: string | Date;
  isFinished?: boolean;
  periodActionPlanItems: {
    sequenceNumber: number;
    task: string;
    assignee: string;
    dueDate: string | Date;
    reason: string;
    instructions: string;
    notes?: string;
    finishedAt?: string | Date;
    isFinished?: boolean;
  }[];
}

export type CreatePeriodActionPlanResponse = PeriodActionPlan;

export const create = async (params: CreatePeriodActionPlanParams) => {
  const { data } = await httpClient.post<CreatePeriodActionPlanResponse>(
    "/period-action-plans",
    params
  );
  return data;
};
