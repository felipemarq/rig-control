import { OccurrenceAction } from "./OccurrenceAction";
import { OccurrenceSeverity } from "./OccurrenceSeverity";
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

export enum OccurenceNature {
  ACCIDENT = "ACCIDENT",
  INCIDENT = "INCIDENT",
  DEATH = "DEATH",
  COMMUTING_ACCIDENT = "COMMUTING_ACCIDENT",
}

export type Occurrence = {
  id: string;
  title: string;
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
  severity?: OccurrenceSeverity;
  category?: OccurrenceCategory;
  nature: OccurenceNature;
  files: [] | { path: string }[];
  base: {
    name: string;
    state: UF;
  };
  occurrenceActions: Array<OccurrenceAction>;
};
