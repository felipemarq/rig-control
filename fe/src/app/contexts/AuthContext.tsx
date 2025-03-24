import * as Sentry from "@sentry/react";
import { createContext, useCallback, useEffect, useState } from "react";
import { localStorageKeys } from "../config/localStorageKeys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usersService } from "../services/usersService";
import { User } from "../entities/User";
import { treatAxiosError } from "../utils/treatAxiosError";
import { AxiosError } from "axios";
import { PageLoader } from "../../view/components/PageLoader";
import { AccessLevel } from "../entities/AccessLevel";
import { QueryKeys } from "../config/QueryKeys";
import { useSystemVersion } from "../hooks/useSystemVersion";
import { currentVersion } from "../config/CurrentVersion";
import { clarity } from "react-microsoft-clarity";
import { useGetEfficiencyPedingConfirmation } from "../hooks/efficiencies/useGetEfficiencyPedingConfirmation";
import { EfficienciesResponse } from "../services/efficienciesService/getAll";
import { Module } from "../entities/Module";

interface AuthContextValue {
  signedIn: boolean;
  isUserAdm: boolean;
  isUserSms: boolean;
  isUserViewer: boolean;
  isUserSupervisor: boolean;
  userAccessLevel: AccessLevel;
  user: User | undefined;
  signin(accessToken: string): void;
  signout(): void;
  isWrongVersion: boolean;
  pendingEfficienciesConfirmation: EfficienciesResponse;
  userOperationPermissions:
    | {
        id: string;
        module: Module;
        canView: boolean;
        canEdit: boolean;
        canCreate: boolean;
      }
    | undefined;
}

export const AuthContext = createContext({} as AuthContextValue);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN,
    );

    return !!storedAccessToken;
  });

  const queryClient = useQueryClient();

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    Sentry.setUser(null);
    setSignedIn(false);
    queryClient.invalidateQueries({ queryKey: [QueryKeys.ME] });
    window.location.reload();
  }, []);

  const { data, isError, error, isFetching, isSuccess } = useQuery({
    queryKey: [QueryKeys.ME],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  });

  const isUserAdm = data?.accessLevel === AccessLevel.ADM ? true : false;

  const isUserSupervisor =
    data?.accessLevel === AccessLevel.SUPERVISOR ? true : false;

  const userSMSPermissions = data?.permissions?.find(
    (permission) => permission.module === Module.SMS,
  );

  const userOperationPermissions = data?.permissions?.find(
    (permission) => permission.module === Module.OPERATION,
  );

  const isUserSms = !!userSMSPermissions?.canView;

  const isUserViewer = data?.accessLevel === AccessLevel.VIEWER;

  const userAccessLevel = data?.accessLevel!;

  const {
    pendingEfficienciesConfirmation,
    refetchpendingEfficienciesConfirmation,
  } = useGetEfficiencyPedingConfirmation(
    isUserSupervisor || data?.email === "felipemarques@conterp.com.br",
  );

  useEffect(() => {
    refetchpendingEfficienciesConfirmation();
  }, [data]);

  useEffect(() => {
    if (import.meta.env.PROD) {
      Sentry.setUser({
        email: data?.email,
        username: data?.name,
      });

      // Identify the user
      if (clarity.hasStarted()) {
        clarity.identify(data?.id ?? "", {
          name: data?.name,
          email: data?.email,
        });
      }
    }
  }, []);

  useEffect(() => {
    if (isError) {
      treatAxiosError((error as Error) || AxiosError);
      signout();
    }
  }, [isError, signout]);

  const { systemVersion, refetchSystemVersion } = useSystemVersion();

  useEffect(() => {
    refetchSystemVersion();
  }, [signedIn]);

  let isWrongVersion = false;

  isWrongVersion = systemVersion?.version !== currentVersion.version;

  console.log("user", data);
  return (
    <AuthContext.Provider
      value={{
        userOperationPermissions,
        signedIn: isSuccess && signedIn,
        signin,
        signout,
        user: data,
        isUserAdm,
        isUserSms,
        isUserSupervisor,
        isUserViewer,
        userAccessLevel,
        isWrongVersion,
        pendingEfficienciesConfirmation,
      }}
    >
      {isFetching && (
        <PageLoader
          isLoading={isFetching}
          logoPath={data?.enterprise?.logoImagePath}
        />
      )}

      {!isFetching && children}
    </AuthContext.Provider>
  );
};
