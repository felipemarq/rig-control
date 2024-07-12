import { UF } from "./Rig";

export enum OccurrenceType {
  HEALTH = "HEALTH",
  ENVIRONMENT = "ENVIRONMENT",
  SAFETY = "SAFETY",
  PROCESS = "PROCESS",
}

export enum Nature {
  ACCIDENT = "ACCIDENT",
  INCIDENT = "INCIDENT",
}

export type Occurrence = {
  id: string;
  date: string;
  hour: string;
  description: string;
  baseId: string;
  userId: string;
  createdAt: string;
  updatedAt?: string;
  type: OccurrenceType;
  isAbsent: boolean;
  nature: Nature;
  base: {
    name: string;
    state: UF;
  };
};
