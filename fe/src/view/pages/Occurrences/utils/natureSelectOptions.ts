import { OccurenceNature } from "@/app/entities/Occurrence";
import { SelectOptions } from "@/app/entities/SelectOptions";

export const natureSelectOptions: SelectOptions = [
  {
    value: OccurenceNature.ACCIDENT,
    label: "Acidente",
  },
  {
    value: OccurenceNature.INCIDENT,
    label: "Incidente",
  },
  {
    value: OccurenceNature.COMMUTING_ACCIDENT,
    label: "Acidente de Trajeto",
  },
  {
    value: OccurenceNature.DEATH,
    label: "Morte",
  },
];
