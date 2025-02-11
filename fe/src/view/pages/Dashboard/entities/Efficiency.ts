import { UF } from "../../../../app/entities/Rig";

export type Efficiency = {
  availableHours: number;
  standByHours: number;
  repairHours: number;
  billedScheduledStopHours?: number;
  unbilledScheduledStopHours?: number;
  date: string | Date;
  id: string;
  well: string;
  rigId: string;
  userId: string;
  user: { name: string };
  rig: { name: string; state: UF };
  periods: {
    id: string;
    efficiencyId: string;
    startHour: string;
    endHour: string;
    type: string;
    classification: string;
    description: string | undefined;
  }[];
  equipmentRatio: {
    ratio: string;
  }[];
  fluidRatio: {
    ratio: string;
  }[];
};
