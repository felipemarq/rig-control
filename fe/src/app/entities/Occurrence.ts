import { UF } from "./Rig";

export enum OccurrenceType {
  HEALTH = "HEALTH",
  ENVIRONMENT = "ENVIRONMENT",
  SAFETY = "SAFETY",
  PROCESS = "PROCESS",
}

export enum OccurrenceCategory {
  TAR = "TAR",
  TOR = "TOR",
}

export enum Nature {
  ACCIDENT = "ACCIDENT",
  INCIDENT = "INCIDENT",
  DEATH = "DEATH",
  COMMUTING_ACCIDENT = "COMMUTING_ACCIDENT",
}

export type Occurrence = {
  id: string;
  date: string;
  hour: string;
  description: string;
  state: UF;
  baseId: string;
  userId: string;
  clientId: string;
  createdAt: string;
  updatedAt?: string;
  type: OccurrenceType;
  isAbsent: boolean;
  category?: OccurrenceCategory;
  nature: Nature;
  files: [] | { path: string }[];
  base: {
    name: string;
    state: UF;
  };
};
