import { differenceInMinutes, parse } from "date-fns";
import { useGlobalDashboard } from "../../../../GlobalDashboardContext/useDashboard";

import { translateClassification } from "../../../../../../../app/utils/translateClassification";
import { useTheme } from "@/app/contexts/ThemeContext";

export type PieChartData = {
  id: string;
  label: string;
  value: number;
  color: string;
}[];

export const usePeriodsDetailsPieChart = () => {
  const {
    unbilledPeriods,
    selectedPieChartView,
    handleCloseDetailsGraph,
    handleSelectedDetailPieChartViewChange,
  } = useGlobalDashboard();
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

  const parseHour = (hourString: string) =>
    parse(hourString.split("T")[1].slice(0, 5), "HH:mm", new Date());

  const chartData = unbilledPeriods
    .filter((period) => period.type === selectedPieChartView)
    .reduce((acc: PieChartData, current) => {
      const classification = translateClassification(current.classification)!;
      const foundItem = acc.find((accItem) => accItem.id === classification)!;

      const parsedStartHour = parseHour(current.startHour);
      const parsedEndHour = parseHour(current.endHour);

      const diffInHours = differenceInMinutes(parsedEndHour, parsedStartHour) / 60;

      if (!foundItem) {
        acc.push({
          id: classification,
          label: classification,
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
    }, []);

  let totalHours = 0;

  chartData.forEach((item) => (totalHours += item.value));

  console.log("O resultado total é", totalHours);

  chartData.forEach((item) =>
    console.log(
      `A porcentagem de ${item.label} é ${((item.value / totalHours) * 100).toFixed(2)}%`
    )
  );

  const mappedChartData = chartData.map((item) => ({
    ...item,
    value: Number(((item.value / totalHours) * 100).toFixed(2)),
  }));

  return {
    chartData,
    mappedChartData,
    selectedPieChartView,
    handleCloseDetailsGraph,
    handleSelectedDetailPieChartViewChange,
  };
};
