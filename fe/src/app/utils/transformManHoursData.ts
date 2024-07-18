import { ManHoursResponse } from "../services/manHoursService/getAll";

export type TransformedManHoursData = {
  id: string;
  baseName: string;
  Janeiro?: number;
  Fevereiro?: number;
  Março?: number;
  Abril?: number;
  Maio?: number;
  Junho?: number;
  Julho?: number;
  Agosto?: number;
  Setembro?: number;
  Outubro?: number;
  Novembro?: number;
  Dezembro?: number;
};

export function transformManHoursData(
  data: ManHoursResponse
): TransformedManHoursData[] {
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const baseMap: { [baseName: string]: TransformedManHoursData } = {};

  data.forEach((record) => {
    const baseName = record.base.name;
    const monthName = months[record.month - 1];

    if (!baseMap[baseName]) {
      baseMap[baseName] = { baseName, id: record.baseId };
    }
    //@ts-ignore
    baseMap[baseName][monthName as keyof TransformedManHoursData] =
      record.hours;
  });



  return Object.values(baseMap);
}
