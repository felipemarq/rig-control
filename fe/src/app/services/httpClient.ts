import axios from "axios";
import { localStorageKeys } from "../config/localStorageKeys";
//import {localStorageKeys} from "../config/localStorageKeys";
//import { timeout } from "../utils/timeout";
//import.meta.env.VITE_APP_BASE_URL,
//"http://localhost:3000/"
export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

httpClient.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

  //await timeout(1500);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
