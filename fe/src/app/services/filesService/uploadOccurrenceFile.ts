import { httpClient } from "../httpClient";

export interface occurenceUploadFileParams {
  occurrenceId: string;
  file: File;
}

const formData = new FormData();
export const uploadOccurrenceFile = async ({
  occurrenceId,
  file,
}: occurenceUploadFileParams) => {
  formData.append("file", file);
  const { data } = await httpClient.post(`file/occurrence/${occurrenceId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
