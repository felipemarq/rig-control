import { create } from "./create";
import { deleteWithBody } from "./deleteWithBody";
import { getAll } from "./getAll";
import { getAverage } from "./getAverage";
import { getById } from "./getById";
import { getPedingConfirmation } from "./getPedingConfirmation";
import { getRigsAverage } from "./getRigsAverage";
import { getWellsCountByRig } from "./getWellsCountByRig";
import { remove } from "./remove";
import { update } from "./update";

export const efficienciesService = {
  create: create,
  getAll: getAll,
  remove: remove,
  update: update,
  getById: getById,
  getAverage: getAverage,
  getRigsAverage: getRigsAverage,
  getWellsCountByRig: getWellsCountByRig,
  deleteWithBody: deleteWithBody,
  getPedingConfirmation: getPedingConfirmation,
};
