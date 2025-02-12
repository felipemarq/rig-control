import { FeedbackStatus, FeedbackType } from "@/app/entities/Feedback";
import { httpClient } from "../httpClient";

export interface CreateFeedbackParams {
  type: FeedbackType;
  status?: FeedbackStatus;
  description: string;
}

export const create = async (params: CreateFeedbackParams) => {
  const { data } = await httpClient.post("/feedbacks", params);

  return data;
};
