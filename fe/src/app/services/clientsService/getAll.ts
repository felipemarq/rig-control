import { Client } from "@/app/entities/Client";
import { httpClient } from "../httpClient";

export type ClientsResponse = Array<Client>;

export const getAll = async () => {
  const { data } = await httpClient.get<ClientsResponse>("/clients");

  return data;
};
