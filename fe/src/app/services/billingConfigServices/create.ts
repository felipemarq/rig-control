import { httpClient } from "../httpClient";
import { BillingConfigResponse } from "./getAll";

export interface BillingConfigCreateParams {
  rigId: string;
  availableHourTax: number;
  glossHourTax: number;
  dtmLt20Tax: number;
  dtmBt20And50Tax: number;
  dtmGt50Tax: number;
  fluidRatioLt20Tax: number;
  fluidRatioBt20And50Tax: number;
  fluidRatioGt50Tax: number;
  equipmentRatioLt20Tax: number;
  equipmentRatioBt20And50Tax: number;
  equipmentRatioGt50Tax: number;
  readjustment: number;
  mobilization: number;
  mobilizationOut: number;
  bobRentTax: number;
  christmasTreeDisassemblyTax: number;
  demobilization: number;
  dtmHourTax: number;
  extraTrailerTax: number;
  generatorFuelTax: number;
  mixTankDemobilizationTax: number;
  mixTankDtmTax: number;
  mixTankHourRentTax: number;
  mixTankMobilizationTax: number;
  mixTankMonthRentTax: number;
  mixTankOperatorTax: number;
  munckTax: number;
  powerSwivelTax: number;
  suckingTruckTax: number;
  transportationTax: number;
  truckCartRentTax: number;
  truckKmTax: number;
  truckTankTax: number;
}

export const create = async (params: BillingConfigCreateParams) => {
  //await timeout(1500);
  const { data } = await httpClient.post<BillingConfigResponse>(
    `/billings-config/`,
    params
  );

  return data;
};
