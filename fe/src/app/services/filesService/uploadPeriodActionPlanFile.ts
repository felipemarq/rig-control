import { httpClient } from "../httpClient";

export interface uploadPeriodActionPlanFileParams {
  periodActionPlanId: string;
  formData: FormData;
}

export const uploadPeriodActionPlanFile = async ({
  periodActionPlanId,
  formData,
}: uploadPeriodActionPlanFileParams) => {
  const { data } = await httpClient.post(
    `file/periodActionPlan/${periodActionPlanId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};
