import { Period } from "./Period";
import { PeriodActionPlanItems } from "./PeriodActionPlanItems";
import { Rig } from "./Rig";

export type PeriodActionPlan = {
  id: string;
  title: string;
  createdAt: string;
  rigId: string;
  updatedAt: string;
  userId: string;
  periodId: string;
  isFinished: boolean;
  finishedAt?: string;
  periodActionPlanItems: PeriodActionPlanItems[];
  period: Period;
  rig: Rig;
  files:
    | []
    | {
        id: string;
        path: string;
        userId: string;
        occurrenceId: null;
        occurrenceActionId: null;
        periodActionPlanId: string;
        createdAt: string;
      }[];
};
