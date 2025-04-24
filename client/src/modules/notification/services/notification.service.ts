import { apiClient } from "@/lib/api";
import { NotificationResponse } from "shared";

export const NotificationService = {
  getNotificationList: async () => {
    const response = await apiClient.get<NotificationResponse[]>(
      "/api/notification"
    );
    return response.data;
  },

  getUnreadCount: async () => {
    const response = await apiClient.get("/api/notification/unread-count");
    return response.data;
  },

  readNotification: async (notificationId: number) => {
    const response = await apiClient.post("/api/notification/read", {
      notificationId,
    });
    return response.data;
  },
};
