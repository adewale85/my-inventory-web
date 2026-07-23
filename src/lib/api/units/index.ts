import { createUnit } from "./createUnit";
import { deleteUnit } from "./deleteUnit";
import { getAllUnits } from "./getAllUnits";
import { getSingleUnit } from "./getSingleUnit";
import { updateUnit } from "./updateUnit";

export const unitsApi = {
  getAllUnits,
  getSingleUnit,
  createUnit,
  updateUnit,
  deleteUnit,
};