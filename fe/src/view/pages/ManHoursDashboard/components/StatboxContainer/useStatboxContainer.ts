import { useManHoursDashboard } from "../../ManHourDashboardContext/useManHoursDashboard";

export const useStatboxContainer = () => {
  const { totalOccurrences } = useManHoursDashboard();

  return { totalOccurrences };
};
