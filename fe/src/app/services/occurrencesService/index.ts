import { create } from "./create";
import { getAll } from "./getAll";
import { getTaxes } from "./getTaxes";
import { getTaxesById } from "./getTaxesById";
import { remove } from "./remove";
import { update } from "./update";

export const occurrencesService = {
  getAll,
  create,
  update,
  getTaxesById,
  remove,
  getTaxes,
};
