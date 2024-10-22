import { differenceInMinutes, parse } from "date-fns";

import { useDashboard } from "../../../../DashboardContext/useDashboard";
import { translateRepairClassification } from "../../../../../../../app/utils/translateRepairClassification";
import { RepairClassification } from "../../../../../../../app/entities/RepairClassification";
import { useTheme } from "@/app/contexts/ThemeContext";

export type PieChartData = {
  id: string;
  label: string;
  value: number;
  color: string;
  classification: string;
  selectedEquipment: string;
}[];

export const useRepairDetailsPieChart = () => {
  const { repairPeriods, selectedEquipment, handleFilterPeriods } = useDashboard();
  const { primaryColor } = useTheme();
  const pieChartColors = [
    primaryColor, // primary 500
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

  let totalHours = 0;

  const parseHour = (hourString: string) =>
    parse(hourString.split("T")[1].slice(0, 5), "HH:mm", new Date());

  const chartData = repairPeriods
    .filter((period) => period.classification === selectedEquipment)
    .reduce((acc: PieChartData, current) => {
      const classification = translateRepairClassification(
        current.repairClassification as RepairClassification
      );
      const foundItem = acc.find((accItem) => accItem.id === classification)!;

      const parsedStartHour = parseHour(current.startHour);
      const parsedEndHour = parseHour(current.endHour);
      const diffInHours = differenceInMinutes(parsedEndHour, parsedStartHour) / 60;

      totalHours += Number(diffInHours.toFixed(2));

      if (!foundItem) {
        acc.push({
          id: classification,
          label: classification,
          classification: current.repairClassification!,
          selectedEquipment: selectedEquipment!,
          value: Number(diffInHours.toFixed(2)),
          color: pieChartColors[acc.length % pieChartColors.length], // Use modulo para evitar estouro de índice
        });
      } else {
        acc = acc.map((accItem) =>
          accItem.id === classification
            ? {
                ...accItem,
                value: Number((accItem.value + diffInHours).toFixed(2)),
              }
            : accItem
        );
      }

      return acc;
    }, [])
    .map((data) => ({
      ...data,
      percentage: Number(((data.value / totalHours) * 100).toFixed(2)),
    }));

  return {
    chartData,
    selectedEquipment,
    handleFilterPeriods,
  };
};
