import { useManHours } from "@/app/hooks/manHours/useManHours";

export interface BaseHours {
  id: string;
  baseName: string;
  Janeiro: number;
  Fevereiro: number;
  Março: number;
  Abril: number;
  Maio: number;
  Junho: number;
  Julho: number;
  Agosto: number;
  Setembro: number;
  Outubro: number;
  Novembro: number;
  Dezembro: number;
}

export const useManHoursController = () => {
  const { manHours, isFetchingManHours } = useManHours();

  const dataGridData: BaseHours[] = [];

  const monthNames: { [key: number]: keyof BaseHours } = {
    1: "Janeiro",
    2: "Fevereiro",
    3: "Março",
    4: "Abril",
    5: "Maio",
    6: "Junho",
    7: "Julho",
    8: "Agosto",
    9: "Setembro",
    10: "Outubro",
    11: "Novembro",
    12: "Dezembro",
  };

  manHours.forEach((item) => {
    let base = dataGridData.find((b) => b.id === item.baseId);

    if (!base) {
      base = {
        id: item.baseId,
        baseName: item.baseName,
        Janeiro: 0,
        Fevereiro: 0,
        Março: 0,
        Abril: 0,
        Maio: 0,
        Junho: 0,
        Julho: 0,
        Agosto: 0,
        Setembro: 0,
        Outubro: 0,
        Novembro: 0,
        Dezembro: 0,
      };
      dataGridData.push(base);
    }

    const monthName = monthNames[item.month];
    //@ts-ignore
    base[monthName] += item.hours;
  });
  console.log(manHours);
  console.log(dataGridData);

  return {
    dataGridData,
    isFetchingManHours,
  };
};
