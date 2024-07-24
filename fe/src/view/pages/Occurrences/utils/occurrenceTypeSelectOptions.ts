import { OccurrenceType } from "@/app/entities/Occurrence";
import { SelectOptions } from "@/app/entities/SelectOptions";

export const occurrenceTypeSelectOptions: SelectOptions = [
  {
    value: OccurrenceType.SAFETY,
    label: "Segurança",
  },
  {
    value: OccurrenceType.HEALTH,
    label: "Saúde",
  },
  {
    value: OccurrenceType.ENVIRONMENT,
    label: "Meio Ambiente",
  },
  {
    value: OccurrenceType.PROCESS,
    label: "Processo",
  },
];
