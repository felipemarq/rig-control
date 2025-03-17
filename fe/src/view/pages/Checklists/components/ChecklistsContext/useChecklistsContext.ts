import { useContext } from "react";
import { ChecklistsContext } from ".";

export const useChecklistsContext = () => {
  return useContext(ChecklistsContext);
};
