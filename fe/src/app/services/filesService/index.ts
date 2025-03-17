import { deleteEvaluationFile } from "./deleteEvaluationFile";
import { deletePeriodActionPlanFile } from "./deletePeriodActionPlanFile";
import { uploadEvaluationFile } from "./uploadEvaluationFile";
import { uploadFile } from "./uploadFile";
import { uploadOccurrenceActionFile } from "./uploadOccurrenceActionFile";
import { uploadOccurrenceFile } from "./uploadOccurrenceFile";
import { uploadPeriodActionPlanFile } from "./uploadPeriodActionPlanFile";

export const filesService = {
  uploadFile: uploadFile,
  uploadOccurrenceFile: uploadOccurrenceFile,
  uploadOccurrenceActionFile: uploadOccurrenceActionFile,
  uploadPeriodActionPlanFile: uploadPeriodActionPlanFile,
  deletePeriodActionPlanFile: deletePeriodActionPlanFile,
  deleteEvaluationFile: deleteEvaluationFile,
  uploadEvaluationFile: uploadEvaluationFile,
};
