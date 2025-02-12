import { BarDatum } from "@nivo/bar";
import { useDashboard } from "../../../../DashboardContext/useDashboard";
import { months } from "@/app/utils/months";

export const useAverageBarChart = () => {
  const { selectedRig, average } = useDashboard();

  const convertedResul: BarDatum[] = average.map(({ avg, month }) => {
    return {
      month: `${months[Number(month.split("-")[1]) - 1].label}`,
      avg: ((avg / 24) * 100).toFixed(2),
    };
  });

  let totalSum = 0;
  average.forEach((value) => {
    totalSum += Number(value.avg);
  });

  return {
    data: convertedResul,
    selectedRig,
  };
};
