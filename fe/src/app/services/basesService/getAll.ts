import { httpClient } from "../httpClient";
import { Base } from "@/app/entities/Base";

export type BasesResponse = Array<Base>;

export const getAll = async (/* filters: usersFilters */) => {
  const { data } = await httpClient.get<BasesResponse>(`/bases/`);

  return data;
};
