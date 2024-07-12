import { AccessLevel } from "../../entities/AccessLevel";
import { httpClient } from "../httpClient";
import { CreateOccurrenceParams } from "./create";

export interface updateOccurreceParams extends CreateOccurrenceParams {
  id: string;
}

export const update = async ({ id, ...params }: updateOccurreceParams) => {
  //await timeout(1500);
  const { data } = await httpClient.put(`/occurrences/${id}`, params);

  return data;
};
