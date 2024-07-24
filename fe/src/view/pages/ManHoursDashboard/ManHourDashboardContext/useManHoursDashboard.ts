import { useContext } from "react";
import { ManHourDashboardContext } from ".";

export const useManHoursDashboard = () => {
  return useContext(ManHourDashboardContext);
};
