import { LogType } from "@/app/entities/LogType";
import { httpClient } from "../httpClient";
import { User } from "@/app/entities/User";

export type GetUserLogsFilters = {
  pageSize: string;
  pageIndex: string;
};

export type UserLog = {
  id: string;
  loginTime: string;
  logType: LogType;
  userId: string;
  user: User;
};

export type UserLogsResponse = {
  data: UserLog[];
  totalItems: number;
};

export const getAll = async (filters: GetUserLogsFilters) => {
  const { data } = await httpClient.get<UserLogsResponse>("/user-log", {
    params: filters,
  });
  return data;
};
