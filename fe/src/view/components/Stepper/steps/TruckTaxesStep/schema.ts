import { z } from "zod";

export const truckTaxesStepSchema = z.object({
  truckCartRentTax: z.union([z.string().min(1), z.number()]),
  truckTankTax: z.union([z.string().min(1), z.number()]),
  truckKmTax: z.union([z.string().min(1), z.number()]),
  suckingTruckTax: z.union([z.string().min(1), z.number()]),
  christmasTreeDisassemblyTax: z.union([z.string().min(1), z.number()]),
});
z.union([z.string().min(1), z.number()]);
