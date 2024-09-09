import { httpClient } from "../httpClient";
import { BillingConfigCreateParams } from "./create";

export interface BillingUpdateParams extends BillingConfigCreateParams {
  id: string;
}

export const update = async ({ id, ...params }: BillingUpdateParams) => {
  //await timeout(1500);
  const { data } = await httpClient.put(`/billings-config/${id}`, params);

  return data;
};
