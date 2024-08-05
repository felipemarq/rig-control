import { httpClient } from "../httpClient";

export const remove = async (clientId: string) => {
  const { data } = await httpClient.delete(`/clients/${clientId}`);

  return data;
};
