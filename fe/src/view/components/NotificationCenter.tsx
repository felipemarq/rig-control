import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Bell, Check } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Notification } from "@/app/entities/Notification";

export default function NotificationCenter({
  initialNotifications = [],
  handleMarkNotificationAsRead,
  isPending,
}: {
  initialNotifications?: Notification[];
  handleMarkNotificationAsRead: (notificationId: string) => Promise<void>;
  isPending: boolean;
}) {
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((item) =>
        item.notification.id === id ? { ...item, isRead: true } : item
      )
    );
    handleMarkNotificationAsRead(id);
  };

  /*   const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, isRead: true }))
    );
  }; */

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="w-full max-w-sm p-4 bg-background">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5" />
          <h4 className="font-semibold">Notificações</h4>
          {unreadCount > 0 && (
            <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium rounded-full bg-primary text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </div>
        {/*  {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
            Marcar todas como lidas
          </Button>
        )} */}
      </div>
      <Separator className="mb-4" />
      <ScrollArea className="h-[300px]">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
            <Bell className="h-8 w-8 mb-2 opacity-50" />
            <p className="text-sm">Nenhuma notificação</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((item) => (
              <div
                key={item.notification.id}
                className={`p-3 rounded-lg  ${item.isRead ? "bg-muted/50" : "bg-muted"}`}
              >
                <div className="flex items-start justify-between gap-2 ">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {item.notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(
                        new Date(item.notification.createdAt),
                        "dd 'de' MMMM 'às' HH:mm",
                        { locale: ptBR }
                      )}
                    </p>
                  </div>{" "}
                  {item.isRead && (
                    <Button variant="ghost" size="icon" className="h-6 w-6" disabled>
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.notification.description}
                </p>

                <div className="mt-2 flex justify-end">
                  {" "}
                  {!item.isRead && (
                    <Button
                      size="sm"
                      disabled={isPending}
                      onClick={() => markAsRead(item.notification.id)}
                      className="gap-x-2"
                    >
                      <Check className="h-4 w-4" />
                      <span className="text-xs"> Marcar como lido</span>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
