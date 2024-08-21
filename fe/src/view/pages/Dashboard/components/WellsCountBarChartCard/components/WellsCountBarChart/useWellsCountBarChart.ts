import { BarDatum } from "@nivo/bar";
import { useDashboard } from "../../../../DashboardContext/useDashboard";
import { months } from "@/app/utils/months";

export const useWellsCountBarChart = () => {
  const { selectedRig, wellsCount } = useDashboard();

  const convertedResult: BarDatum[] = wellsCount.map(
    ({ month, well_count }) => {
      return {
        month: `${months[Number(month) - 1].label}`,
        wellCount: Number(well_count),
      };
    }
  );

  return {
    data: convertedResult,
    selectedRig,
  };
};
