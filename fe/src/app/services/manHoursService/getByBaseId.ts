import { ManHour } from "@/app/entities/ManHour";

import { httpClient } from "../httpClient";

export type GetManHoursByBaseIdResponse = Array<ManHour>;

export const getAll = async () => {
  const { data } = await httpClient.get<GetManHoursByBaseIdResponse>(
    `/man-hours/`
  );

  return data;
};
