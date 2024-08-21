import { useDashboard } from "../../DashboardContext/useDashboard";
import { translateClassification } from "../../../../../app/utils/translateClassification";
import { getDiffInMinutes } from "../../../../../app/utils/getDiffInMinutes";
import { parse } from "date-fns";
import { formatNumberWithFixedDecimals } from "../../../../../app/utils/formatNumberWithFixedDecimals";

export interface EquipmentData {
  id: string;
  equipment: string;
  qty: number;
  value: number;
  color: string;
  percentage: number;
  label: string;
}

export interface GrouppedEquipmentData {
  totalRepairHours: number;
  groupedData: EquipmentData[];
}

export const useGrouppedRepairsPieChartCard = () => {
  const { repairPeriods, selectedEquipment } = useDashboard();

  const pieChartColors = [
    "#1c7b7b", // primary 500
    "#81c460",
    "#ffda79", // Amarelo
    "#564787", // Roxo
    "#f38181", // Rosa
    "#84fab0", // Verde claro
    "#ff5722", // Laranja
    "#416788", // Azul marinho
    "#b8de6f", // Verde limão
    "#94618e", // Roxo claro
    "#ffa45b", // Pêssego
    "#a3de83", // Verde pastel
  ];

  const repairGroupedData: GrouppedEquipmentData = repairPeriods.reduce(
    (acc: GrouppedEquipmentData, current) => {
      const foundIndex = acc.groupedData.findIndex(
        (item) =>
          item.equipment === translateClassification(current.classification)
      );

      const parsedStartHour = parse(
        current.startHour.split("T")[1].slice(0, 5),
        "HH:mm",
        new Date()
      );
      const parsedEndHour = parse(
        current.endHour.split("T")[1].slice(0, 5),
        "HH:mm",
        new Date()
      );

      acc.totalRepairHours += formatNumberWithFixedDecimals(
        getDiffInMinutes(parsedEndHour, parsedStartHour) / 60,
        2
      );

      if (foundIndex === -1) {
        acc.groupedData.push({
          id: current.classification,
          equipment: translateClassification(current.classification)!,
          qty: 1,
          value: formatNumberWithFixedDecimals(
            getDiffInMinutes(parsedEndHour, parsedStartHour) / 60,
            2
          ),
          color: pieChartColors[acc.groupedData.length % pieChartColors.length],
          percentage: 0,
          label: translateClassification(current.classification)!,
        });
      } else {
        acc.groupedData[foundIndex].qty += 1;
        acc.groupedData[foundIndex].value += formatNumberWithFixedDecimals(
          getDiffInMinutes(parsedEndHour, parsedStartHour) / 60,
          2
        );
      }

      return acc;
    },
    { totalRepairHours: 0, groupedData: [] }
  );

  const chartData = repairGroupedData.groupedData.map((data) => ({
    ...data,
    percentage: Number(
      ((data.value / repairGroupedData.totalRepairHours) * 100).toFixed(2)
    ),
  }));

  const hasRepairData = repairGroupedData.groupedData.length > 0;

  return {
    chartData,
    hasRepairData,
    selectedEquipment,
  };
};
