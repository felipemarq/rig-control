import { z } from "zod";

export const periodAndTaxesStepSchema = z.object({
  glossHourTax: z.union([z.string().min(1), z.number()]),
  availableHourTax: z.union([z.string().min(1), z.number()]),
  startDate: z.date(),
  endDate: z.date(),
});
