import { httpClient } from "../httpClient";
import { CreateManHourParams } from "./create";

export interface updateManHourParams extends CreateManHourParams {
  id: string;
}

export const update = async ({ id, ...params }: updateManHourParams) => {
  //await timeout(1500);
  const { data } = await httpClient.put(`/man-hours/${id}`, params);

  return data;
};
