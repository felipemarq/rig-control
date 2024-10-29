import { useManHoursDashboard } from "../../ManHourDashboardContext/useManHoursDashboard";

export const useStatboxContainer = () => {
  const { totalOccurrences } = useManHoursDashboard();
  console.log("Total Occurrences", totalOccurrences);

  return { totalOccurrences };
};
