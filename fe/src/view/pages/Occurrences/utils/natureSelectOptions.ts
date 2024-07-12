import { Nature } from "@/app/entities/Occurrence";
import { SelectOptions } from "@/app/entities/SelectOptions";

export const natureSelectOptions: SelectOptions = [
  {
    value: Nature.ACCIDENT,
    label: "Acidente",
  },
  {
    value: Nature.INCIDENT,
    label: "Incidente",
  },
  {
    value: Nature.COMMUTING_ACCIDENT,
    label: "Acidente de Trajeto",
  },
  {
    value: Nature.DEATH,
    label: "Morte",
  },
];
