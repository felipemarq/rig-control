import {Contract} from "../../entities/Contract";

import {httpClient} from "../httpClient";

export type ContractsResponse = Array<Contract>;

export const getAll = async () => {
  const {data} = await httpClient.get<ContractsResponse>(`/contracts/`);

  return data;
};
