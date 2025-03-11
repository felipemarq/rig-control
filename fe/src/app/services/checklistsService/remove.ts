import { httpClient } from "../httpClient";

export const remove = async (checklistId: string) => {
  const { data } = await httpClient.delete(`/checklists/${checklistId}`);

  return data;
};
