import { create } from "./create";
import { getAll } from "./getAll";
import { getAllChecklistsItems } from "./getAllChecklistsItems";
import { remove } from "./remove";
import { update } from "./update";

export const checklistsService = {
  getAllChecklistsItems: getAllChecklistsItems,
  create: create,
  getAll: getAll,
  remove: remove,
  update: update,
};
