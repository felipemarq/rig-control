import { PeriodType } from "./PeriodType";
import { PersistanceEfficiency } from "./PersistanceEfficiency";

export type Period = {
  id: string;
  startHour: string;
  endHour: string;
  classification: string;
  repairClassification: string | null;
  description: string;
  type: PeriodType;
  efficiencyId: string;
  well: {
    id: string;
    name: string;
  };
  efficiency?: PersistanceEfficiency;
};
