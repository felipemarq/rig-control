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

export const getAll = async () => {
  const { data } = await httpClient.get<ManHoursResponse>(`/man-hours/`);

  return data;
};
