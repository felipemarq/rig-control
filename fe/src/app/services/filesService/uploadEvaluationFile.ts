import { httpClient } from "../httpClient";

export interface EvaluationUploadFileParams {
  evaluationId: string;
  file: File;
}

export const uploadEvaluationFile = async ({
  evaluationId,
  file,
}: EvaluationUploadFileParams) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await httpClient.post(
    `file/evaluation/${evaluationId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
};
