import { useTotalManHoursDashboard } from "../../TotalManHoursDashboardContext/useTotalManHoursDashboard";

export const useStatboxContainer = () => {
  const { totalOccurrences } = useTotalManHoursDashboard();

  return { totalOccurrences };
};
