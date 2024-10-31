import { createContext, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Notification } from "../entities/Notification";
import { useMutation } from "@tanstack/react-query";
import { notificationsService } from "../services/notificationsService";
import { treatAxiosError } from "../utils/treatAxiosError";
import { AxiosError } from "axios";
import { customColorToast } from "../utils/customColorToast";
import { useTheme } from "./ThemeContext";

interface NotificationContextValue {
  showNotifications: boolean;
  setShowNotifications: (showNotifications: boolean) => void;
  notifications: Notification[];
  handleMarkNotificationAsRead: (notificationId: string) => Promise<void>;
  isPending: boolean;
}

export const NotificationContext = createContext({} as NotificationContextValue);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { primaryColor } = useTheme();
  const { user } = useAuth();

  const { isPending, mutateAsync: mutateMarkAsReadAsync } = useMutation({
    mutationFn: (notificationId: string) =>
      notificationsService.markAsRead(notificationId),
  });

  const handleMarkNotificationAsRead = async (notificationId: string) => {
    try {
      await mutateMarkAsReadAsync(notificationId);

      customColorToast("Notificação lida!", primaryColor, "success");
    } catch (error: any | typeof AxiosError) {
      treatAxiosError(error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        handleMarkNotificationAsRead,
        showNotifications,
        setShowNotifications,
        notifications: user?.userNotifications!,
        isPending,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
