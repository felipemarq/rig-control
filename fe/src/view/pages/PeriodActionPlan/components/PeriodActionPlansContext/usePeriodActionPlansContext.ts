import { useContext } from "react";
import { PeriodActionPlansContext } from ".";

export const usePeriodActionPlansContext = () => {
  return useContext(PeriodActionPlansContext);
};
