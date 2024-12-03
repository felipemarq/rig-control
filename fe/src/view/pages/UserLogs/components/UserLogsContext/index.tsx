import { createContext } from "react";
import { useParams } from "react-router-dom";

interface UserLogsContextValue {
  userId: string;
}

export const UserLogsContext = createContext({} as UserLogsContextValue);

export const UserLogsProvider = ({ children }: { children: React.ReactNode }) => {
  const param = useParams();
  console.log("params", param);
  const userId = param.userId;

  if (!userId) {
    return undefined;
  }
  return (
    <UserLogsContext.Provider value={{ userId }}>{children}</UserLogsContext.Provider>
  );
};
