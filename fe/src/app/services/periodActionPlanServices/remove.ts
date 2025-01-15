import { httpClient } from "../httpClient";

export const remove = async (periodActionPlanId: string) => {
  const { data } = await httpClient.delete(`/period-action-plans/${periodActionPlanId}`);

  return data;
};
