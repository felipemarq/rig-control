enum OccurrenceSeverity {
  MINOR = "MINOR",
  MODERATE = "MODERATE",
  SEVERE = "SEVERE",
}

import { SelectOptions } from "@/app/entities/SelectOptions";

export const occurrenceSeveritySelectOptions: SelectOptions = [
  {
    value: OccurrenceSeverity.MINOR,
    label: "Leve",
  },
  {
    value: OccurrenceSeverity.MODERATE,
    label: "Médio",
  },
  {
    value: OccurrenceSeverity.SEVERE,
    label: "Grave",
  },
];
