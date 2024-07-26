import { httpClient } from "../httpClient";

export interface userLogCreateParams {
  occurrenceId: string;
  file: File;
}

const formData = new FormData();
export const create = async ({ occurrenceId, file }: userLogCreateParams) => {
  formData.append("file", file);
  const { data } = await httpClient.post(
    `upload-file/occurrence/${occurrenceId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};
