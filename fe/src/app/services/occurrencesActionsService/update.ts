import { httpClient } from "../httpClient";
import { CreateOccurrenceActionParams } from "./create";

export interface updateOccurrenceActionsParams extends CreateOccurrenceActionParams {
  id: string;
}

export const update = async ({ id, ...params }: updateOccurrenceActionsParams) => {
  //await timeout(1500);
  const { data } = await httpClient.put(`/occurrence-actions/${id}`, params);

  return data;
};
