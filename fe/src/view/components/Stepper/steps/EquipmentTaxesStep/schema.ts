import { z } from "zod";

export const equipmentTaxesStepSchema = z.object({
  bobRentTax: z.union([z.string().min(1), z.number()]),
  generatorFuelTax: z.union([z.string().min(1), z.number()]),
  extraTrailerTax: z.union([z.string().min(1), z.number()]),
  munckTax: z.union([z.string().min(1), z.number()]),
  powerSwivelTax: z.union([z.string().min(1), z.number()]),
});
