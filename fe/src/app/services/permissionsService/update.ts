import { Module } from "@/app/entities/Module";
import { httpClient } from "../httpClient";

export interface UpdatePermissionsParams {
  permissions: {
    id: string;
    userId: string;
    module: Module;
    canView: boolean;
    canEdit: boolean;
    canCreate: boolean;
  }[];
}

export const update = async (params: UpdatePermissionsParams) => {
  //await timeout(1500);
  const { data } = await httpClient.post(`/permissions/`, params);

  return data;
};
