import { httpClient } from "../httpClient";

export type RigWellsCountResponse = {
  rig_name: string;
  year: string;
  month: string;
  well_count: string;
}[];

export const getWellsCountByRig = async (rigId: string) => {
  const { data } = await httpClient.get<RigWellsCountResponse>(
    `/efficiencies/well-count/${rigId}`
  );

  return data;
};
