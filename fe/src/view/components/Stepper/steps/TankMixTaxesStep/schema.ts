import { z } from "zod";

export const tankMixTaxesStepSchema = z.object({
  mixTankMonthRentTax: z.union([z.string().min(1), z.number()]),
  mixTankHourRentTax: z.union([z.string().min(1), z.number()]),
  mixTankMobilizationTax: z.union([z.string().min(1), z.number()]),
  mixTankDemobilizationTax: z.union([z.string().min(1), z.number()]),
  mixTankDtmTax: z.union([z.string().min(1), z.number()]),
  mixTankOperatorTax: z.union([z.string().min(1), z.number()]),
});
