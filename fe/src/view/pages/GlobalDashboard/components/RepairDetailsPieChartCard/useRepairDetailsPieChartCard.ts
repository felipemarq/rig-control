import { useGlobalDashboard } from "../../GlobalDashboardContext/useDashboard";

export const useRepairDetailsPieChartCard = () => {
  const { unbilledPeriods, selectedPieChartView, selectedPeriodClassification } =
    useGlobalDashboard();
  return {
    unbilledPeriods,
    selectedPieChartView,
    selectedPeriodClassification,
  };
};
