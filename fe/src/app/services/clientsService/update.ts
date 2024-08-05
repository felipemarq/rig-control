import { httpClient } from "../httpClient";
import { CreateClientParams } from "./create";

export interface updateClientParams extends CreateClientParams {
  id: string;
}

export const update = async ({ id, ...params }: updateClientParams) => {
  //await timeout(1500);
  const { data } = await httpClient.put(`/clients/${id}`, params);

  return data;
};
