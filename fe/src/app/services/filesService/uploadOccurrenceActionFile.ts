import { httpClient } from "../httpClient";

export interface occurenceActionUploadFileParams {
  occurrenceActionId: string;
  file: File;
}

const formData = new FormData();
export const uploadOccurrenceActionFile = async ({
  occurrenceActionId,
  file,
}: occurenceActionUploadFileParams) => {
  formData.append("file", file);
  const { data } = await httpClient.post(
    `file/occurrence-action/${occurrenceActionId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};
