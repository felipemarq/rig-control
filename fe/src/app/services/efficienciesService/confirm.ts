import { httpClient } from "../httpClient";

export const confirm = async (efficiencyId: string) => {
  const { data } = await httpClient.post(
    `efficiencies/confirm/${efficiencyId}`
  );

  return data;
};
