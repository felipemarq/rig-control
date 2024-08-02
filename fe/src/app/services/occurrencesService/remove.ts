import { httpClient } from "../httpClient";

export const remove = async (occurrenceId: string) => {
  const { data } = await httpClient.delete(`/occurrences/${occurrenceId}`);

  return data;
};
