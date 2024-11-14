export type Feedback = {
  id: string;
  type: FeedbackType;
  status: FeedbackStatus;
  description: string;
  createdAt: string;
  userId: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export enum FeedbackType {
  SUGESTION = "SUGESTION",
  PROBLEM = "PROBLEM",
  OTHER = "OTHER",
}

export enum FeedbackStatus {
  RECEIVED = "RECEIVED",
  IN_REVIEW = "IN_REVIEW",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  NO_ACTION_NEEDED = "NO_ACTION_NEEDED",
  PENDING = "PENDING",
}
