import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Bell } from "lucide-react";
import NotificationCenter from "./NotificationCenter";
import { Notification } from "@/app/entities/Notification";

interface NotificationsPopoverProps {
  showNotifications: boolean;
  setShowNotifications: (showNotifications: boolean) => void;
  notifications: Notification[];
  handleMarkNotificationAsRead: (notificationId: string) => Promise<void>;
  isPending: boolean;
}

export const NotificationsPopover = ({
  showNotifications,
  setShowNotifications,
  notifications,
  handleMarkNotificationAsRead,
  isPending,
}: NotificationsPopoverProps) => {
  return (
    <Popover open={showNotifications} onOpenChange={setShowNotifications}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
          >
            {notifications.filter((n) => !n.isRead).length}
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <NotificationCenter
          initialNotifications={notifications}
          handleMarkNotificationAsRead={handleMarkNotificationAsRead}
          isPending={isPending}
        />
      </PopoverContent>
    </Popover>
  );
};
