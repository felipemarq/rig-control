import { useContext } from "react";
import { OccurrencesContext } from ".";

export const useOccurrencesContext = () => {
  return useContext(OccurrencesContext);
};
