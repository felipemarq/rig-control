import { create } from "./create";
import { getAll } from "./getAll";
import { update } from "./update";
import { getAllByRigId } from "./getAllByRigId";

export const billingConfigService = {
  getAll: getAll,
  update: update,
  create: create,
  getAllByRigId: getAllByRigId,
};
