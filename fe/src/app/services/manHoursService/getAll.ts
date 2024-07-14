import { httpClient } from "../httpClient";

export type ManHoursResponse = Array<{
  hours: number;
  baseId: string;
  baseName: string;
  year: number;
  month: number;
}>;

export const getAll = async () => {
  const { data } = await httpClient.get<ManHoursResponse>(`/man-hours/`);

  return data;
};
