import { Feedback } from "@/app/entities/Feedback";
import { httpClient } from "../httpClient";

export type FeedbacksResponse = Array<Feedback>;

export const getAll = async () => {
  const { data } = await httpClient.get<FeedbacksResponse>(`/feedbacks/`);

  return data;
};
