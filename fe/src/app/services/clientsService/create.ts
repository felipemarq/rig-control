import { Client } from "@/app/entities/Client";
import { httpClient } from "../httpClient";

export interface CreateClientParams {
  id: string;
  name: string;
  logoImagePath?: string;
}

export type ClientCreateResponse = Client;

export const create = async (params: CreateClientParams) => {
  const { data } = await httpClient.post<ClientCreateResponse>(
    "/occurrences",
    params
  );
  return data;
};
