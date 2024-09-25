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

interface AuthContextValue {
  signedIn: boolean;
  isUserAdm: boolean;
  isUserSms: boolean;
  userAccessLevel: AccessLevel;
  user: User | undefined;
  signin(accessToken: string): void;
  signout(): void;
  isWrongVersion: boolean;
}

export const AuthContext = createContext({} as AuthContextValue);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

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
  }, []);

  const { data, isError, error, isFetching, isSuccess } = useQuery({
    queryKey: [QueryKeys.ME],
    queryFn: () => usersService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  });

  const isUserAdm = data?.accessLevel === "ADM" ? true : false;

  const isUserSms = data?.email === ("rommelcaldas@conterp.com.br" || "bianca@conterp.com.br");

  const userAccessLevel = data?.accessLevel!;

  useEffect(() => {
    if (import.meta.env.PROD) {
      Sentry.setUser({
        email: data?.email,
        username: data?.name,
      });
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

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        signin,
        signout,
        user: data,
        isUserAdm,
        isUserSms,
        userAccessLevel,
        isWrongVersion,
      }}
    >
      {isFetching && <PageLoader isLoading={isFetching} />}

      {!isFetching && children}
    </AuthContext.Provider>
  );
};
