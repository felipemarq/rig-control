import { LogType } from "@/app/entities/LogType";
import { useUserLogs } from "@/app/hooks/userLogs/useUserLogs";
import {
  GetUserLogsFilters,
  UserLog,
  UserLogsResponse,
} from "@/app/services/userLogsService/getAll";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type LogTypeTranslation = {
  [key in LogType]: {
    value: LogType;
    label: string;
  };
};

interface UserLogsContextValue {
  reload: () => void;
  isFetchingUserLogs: boolean;
  userLogs: UserLog[];
  totalUserLogs: number;
  filters: GetUserLogsFilters;
  logTypeTranslation: LogTypeTranslation;
  handleChangeFilters: <TFilter extends keyof GetUserLogsFilters>(
    filter: TFilter
  ) => (value: GetUserLogsFilters[TFilter]) => void;
  totalPages: number;
}

export const UserLogsContext = createContext({} as UserLogsContextValue);

export const UserLogsProvider = ({ children }: { children: React.ReactNode }) => {
  const param = useParams();

  const userId = param.userId;
  const [filters, setFilters] = useState<GetUserLogsFilters>({
    pageIndex: "1",
    pageSize: "10",
    userId: userId,
    logType: "ALL",
  });

  const logTypeTranslation: LogTypeTranslation = {
    LOGIN: { value: LogType.LOGIN, label: "Login" },
    LOGOUT: { value: LogType.LOGOUT, label: "Logout" },
    PASSWORD_CHANGE: { value: LogType.PASSWORD_CHANGE, label: "Alteração de Senha" },
    CONFIGURATION_CHANGE: {
      value: LogType.CONFIGURATION_CHANGE,
      label: "Alteração de Configuração",
    },
    DATA_EXPORT: { value: LogType.DATA_EXPORT, label: "Exportação de Dados" },
    BDO_CREATE: { value: LogType.BDO_CREATE, label: "Criação de BDO" },
    BDO_EDIT: { value: LogType.BDO_EDIT, label: "Edição de BDO" },
    BDO_DELETE: { value: LogType.BDO_DELETE, label: "Exclusão de BDO" },
    EFFICIENCY_VIEW: {
      value: LogType.EFFICIENCY_VIEW,
      label: "Visualização de Eficiência",
    },
    EFFICIENCY_CREATE: {
      value: LogType.EFFICIENCY_CREATE,
      label: "Criação de Eficiência",
    },
    EFFICIENCY_EDIT: { value: LogType.EFFICIENCY_EDIT, label: "Edição de Eficiência" },
    OCCURRENCE_CREATE: {
      value: LogType.OCCURRENCE_CREATE,
      label: "Criação de Ocorrência",
    },
    OCCURRENCE_EDIT: { value: LogType.OCCURRENCE_EDIT, label: "Edição de Ocorrência" },
    OCCURRENCE_DELETE: {
      value: LogType.OCCURRENCE_DELETE,
      label: "Exclusão de Ocorrência",
    },
    REPORT_GENERATION: {
      value: LogType.REPORT_GENERATION,
      label: "Geração de Relatório",
    },
    VIEW_CRITICAL_DATA: {
      value: LogType.VIEW_CRITICAL_DATA,
      label: "Visualização de Dados Críticos",
    },
    ALERT_ACKNOWLEDGMENT: {
      value: LogType.ALERT_ACKNOWLEDGMENT,
      label: "Reconhecimento de Alerta",
    },
    OTHER: { value: LogType.OTHER, label: "Outro" },
  };

  function handleChangeFilters<TFilter extends keyof GetUserLogsFilters>(
    filter: TFilter
  ) {
    return (value: GetUserLogsFilters[TFilter]) => {
      if (value === filters[filter]) return;

      setFilters((prevState) => ({
        ...prevState,
        [filter]: value,
      }));
    };
  }

  const {
    isFetchingUserLogs,
    refetchUserLogs,
    userLogsResponse: { data: userLogs, totalItems: totalUserLogs },
  } = useUserLogs(filters);

  useEffect(() => {
    refetchUserLogs();
  }, [filters]);

  const totalPages = totalUserLogs / Number(filters.pageSize);

  const reload = () => {
    refetchUserLogs();
  };

  return (
    <UserLogsContext.Provider
      value={{
        reload,
        isFetchingUserLogs,
        totalUserLogs,
        userLogs,
        filters,
        logTypeTranslation,
        handleChangeFilters,
        totalPages,
      }}
    >
      {children}
    </UserLogsContext.Provider>
  );
};
