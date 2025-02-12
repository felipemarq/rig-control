import { deletePeriodActionPlanFile } from "./deletePeriodActionPlanFile";
import { uploadOccurrenceActionFile } from "./uploadOccurrenceActionFile";
import { uploadOccurrenceFile } from "./uploadOccurrenceFile";
import { uploadPeriodActionPlanFile } from "./uploadPeriodActionPlanFile";

export const filesService = {
  uploadOccurrenceFile: uploadOccurrenceFile,
  uploadOccurrenceActionFile: uploadOccurrenceActionFile,
  uploadPeriodActionPlanFile: uploadPeriodActionPlanFile,
  deletePeriodActionPlanFile: deletePeriodActionPlanFile,
};
