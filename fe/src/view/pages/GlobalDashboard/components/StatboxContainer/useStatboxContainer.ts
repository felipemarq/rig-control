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
    if (data.id === "GLOSS") {
      glossHours += data.value;
    }

    if (data.id === "REPAIR") {
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
