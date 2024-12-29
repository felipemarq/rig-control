import { PeriodActionPlanItems } from "./PeriodActionPlanItems";

export type PeriodActionPlan = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  periodId: string;
  isFinished: boolean;
  finishedAt?: string;
  periodActionPlanItems: PeriodActionPlanItems[];
};
