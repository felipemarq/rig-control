import {AccessLevel} from "./AccessLevel";
import {Contract} from "./Contract";

export interface User {
  id: string;
  name: string;
  email: string;
  accessLevel: AccessLevel;
  contract?: Array<Contract>;
  rigs: {
    rig: {
      id: string;
      name: string;
      state?: string;
      isAtive?: boolean;
      contract: {
        id: string;
        name: string;
      };
    };
  }[];
}
