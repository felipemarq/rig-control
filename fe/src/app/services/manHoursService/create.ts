import { httpClient } from "../httpClient";

export interface CreateManHourParams {
  baseId: string;
  hours: number;
  month: number;
  year: number;
}

export const create = async (params: CreateManHourParams) => {
  const { data } = await httpClient.post("/man-hours", params);

  return data;
};
