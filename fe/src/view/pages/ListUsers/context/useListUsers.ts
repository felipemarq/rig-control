import { useContext } from "react";
import { ListUsersContext } from ".";

export const useListUsers = () => {
  return useContext(ListUsersContext);
};
