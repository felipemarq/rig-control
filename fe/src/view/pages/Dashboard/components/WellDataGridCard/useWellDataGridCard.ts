import { useDashboard } from "../../DashboardContext/useDashboard";

export const useWellDataGridCard = () => {
  const { isEmpty, isFetchingEfficiencies, efficiencies, windowWidth } =
    useDashboard();

  return { isEmpty, isFetchingEfficiencies, efficiencies, windowWidth };
};
