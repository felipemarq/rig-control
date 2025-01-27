import { PersistanceEfficiency } from "../../entities/PersistanceEfficiency";
import { httpClient } from "../httpClient";

export type EfficienciesResponse = PersistanceEfficiency[];

export const getPedingConfirmation = async () => {
  const { data } = await httpClient.get<EfficienciesResponse>(
    `/efficiencies/pending-efficiency-confirmation`
  );

  return data;
};
