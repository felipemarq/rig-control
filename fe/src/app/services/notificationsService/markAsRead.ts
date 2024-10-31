import { httpClient } from "../httpClient";

export const markAsRead = async (notificationId: string) => {
  await httpClient.patch(`/notifications/mark-as-read/${notificationId}`);
};
