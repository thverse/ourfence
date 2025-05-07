import { apiClient } from "@/lib/api";
import {
  NotificationResponse,
  NotificationUnreadCountResponse,
} from "@ourfence/shared";

export const NotificationService = {
  getNotificationList: async () => {
    const response = await apiClient.get<NotificationResponse[]>(
      "/api/notification"
    );
    return response.data;
  },

  getUnreadCount: async () => {
    const response = await apiClient.get<NotificationUnreadCountResponse>(
      "/api/notification/unread-count"
    );
    return response.data;
  },

  readNotification: async (notificationId: number) => {
    const response = await apiClient.post("/api/notification/read", {
      notificationId,
    });
    return response.data;
  },
};
