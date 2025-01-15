export type Notification = {
  isRead: boolean;
  notification: {
    id: string;
    title: string;
    createdAt: string;
    description: string;
  };
};
