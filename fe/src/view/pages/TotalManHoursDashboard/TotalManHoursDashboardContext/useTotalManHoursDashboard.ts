import { useContext } from "react";
import { TotalManHoursDashboardContext } from ".";

export const useTotalManHoursDashboard = () => {
  return useContext(TotalManHoursDashboardContext);
};
