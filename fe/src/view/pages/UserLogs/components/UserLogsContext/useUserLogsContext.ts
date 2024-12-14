import { useContext } from "react";
import { UserLogsContext } from ".";

export const useUserLogsContext = () => {
  return useContext(UserLogsContext);
};
