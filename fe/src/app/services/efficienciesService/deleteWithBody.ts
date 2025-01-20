import { httpClient } from "../httpClient";

export type DeleteWithBodyParams = {
  rigId: string;
  date: string | Date;
};

export const deleteWithBody = async (params: DeleteWithBodyParams) => {
  const { data } = await httpClient.post("/efficiencies/delete", params);

  return data;
};
