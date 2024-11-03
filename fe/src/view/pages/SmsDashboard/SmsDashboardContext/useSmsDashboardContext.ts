import { useContext } from "react";
import { SmsDashboardContext } from ".";

export const useSmsDashboardContext = () => {
  return useContext(SmsDashboardContext);
};
