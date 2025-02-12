import { httpClient } from "../httpClient";
import { CreatePeriodActionPlanParams } from "./create";

export interface updatePeriodActionPlanParams extends CreatePeriodActionPlanParams {
  id: string;
}

export const update = async ({ id, ...params }: updatePeriodActionPlanParams) => {
  //await timeout(1500);
  const { data } = await httpClient.put(`/period-action-plans/${id}`, params);

  return data;
};
