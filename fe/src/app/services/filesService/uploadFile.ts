import { httpClient } from "../httpClient";

export interface uploadFileParams {
  file: File;
}

export const uploadFile = async ({ file }: uploadFileParams) => {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await httpClient.post(`file`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};
