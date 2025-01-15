export type PeriodActionPlanItems = {
  id: string;
  sequenceNumber: number;
  task: string;
  assignee: string;
  dueDate: string | Date;
  reason: string;
  instructions: string;
  notes: string;
  isFinished: boolean;
  finishedAt?: string;
  createdAt: string;
  updatedAt: string;
  actionPlanId: string;
};
