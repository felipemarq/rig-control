export enum OccurrenceType {
  HEALTH = "HEALTH",
  ENVIRONMENT = "ENVIRONMENT",
  SAFETY = "SAFETY",
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
  type: OccurrenceType;
  nature: Nature;
};
