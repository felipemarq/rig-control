import { useGlobalDashboard } from "../../GlobalDashboardContext/useDashboard";

export const useStatboxContainer = () => {
  const {
    statBox: { averageHours, averageHoursPercentage, averageUnavailableHours },
    unbilledPeriodsChartData,
    isFetchingRigsAverage,
    selectedDashboardView,
  } = useGlobalDashboard();

  let glossHours = 0;
  let repairHours = 0;

  unbilledPeriodsChartData.forEach((data) => {
    if (data.label === "GLOSS") {
      glossHours += data.value;
    }

    if (data.label === "REPAIR") {
      repairHours += data.value;
    }
  });

  return {
    glossHours,
    repairHours,
    averageHours,
    isFetchingRigsAverage,
    averageHoursPercentage,
    selectedDashboardView,
    averageUnavailableHours,
  };
};
