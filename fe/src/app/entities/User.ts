import { AccessLevel } from "./AccessLevel";
import { Contract } from "./Contract";
import { Module } from "./Module";
import { Notification } from "./Notification";

export interface User {
  id: string;
  name: string;
  email: string;
  accessLevel: AccessLevel;
  contract?: Array<Contract>;
  userLog:
    | {
        loginTime: string;
      }[]
    | [];
  rigs: {
    rig: {
      id: string;
      name: string;
      state?: string;
      isAtive?: boolean;
      contract: {
        client: {
          id: string;
          name: string;
        };
      };
    };
  }[];
  enterprise?: {
    id: string;
    logoImagePath: string;
    mainColor: string;
    name: string;
  };
  userNotifications: Notification[];
  permissions: {
    id: string;
    module: Module;
    canView: boolean;
    canEdit: boolean;
    canCreate: boolean;
  }[];
  isActive: boolean;
}
