import { httpClient } from "../httpClient";

export type ManHoursResponse = Array<{
  id: string;
  baseId: string;
  year: number;
  month: number;
  hours: number;
  createdAt: string;
  updatedAt?: string;
  userId: string;
  base: { name: string };
}>;

export type ManHourFilters = {
  year: string;
};

export const getAll = async ({ year }: ManHourFilters) => {
  const { data } = await httpClient.get<ManHoursResponse>(`/man-hours/`, {
    params: { year: year },
  });

  return data;
};
