import { httpClient } from "../httpClient";

export const deletePeriodActionPlanFile = async (fileId: string) => {
  const { data } = await httpClient.delete(`file/periodActionPlan/${fileId}`);

  return data;
};
