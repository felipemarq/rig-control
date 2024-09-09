import { z } from "zod";

export const mobilizationTaxesStepSchema = z.object({
  dtmHourTax: z.union([z.string().min(1), z.number()]),
  dtmLt20Tax: z.union([z.string().min(1), z.number()]),
  dtmBt20And50Tax: z.union([z.string().min(1), z.number()]),
  dtmGt50Tax: z.union([z.string().min(1), z.number()]),
  equipmentRatioBt20And50Tax: z.union([z.string().min(1), z.number()]),
  equipmentRatioGt50Tax: z.union([z.string().min(1), z.number()]),
  equipmentRatioLt20Tax: z.union([z.string().min(1), z.number()]),
  fluidRatioBt20And50Tax: z.union([z.string().min(1), z.number()]),
  fluidRatioGt50Tax: z.union([z.string().min(1), z.number()]),
  fluidRatioLt20Tax: z.union([z.string().min(1), z.number()]),
  mobilization: z.union([z.string().min(1), z.number()]),
  demobilization: z.union([z.string().min(1), z.number()]),
  transportationTax: z.union([z.string().min(1), z.number()]),
});
z.union([z.string().min(1), z.number()]);
