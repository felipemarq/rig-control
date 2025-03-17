import { httpClient } from "../httpClient";

export const deleteEvaluationFile = async (evaluation: string) => {
  const { data } = await httpClient.delete(`file/evaluation/${evaluation}`);

  return data;
};
