import { useQuery } from "@tanstack/react-query";
import { NotificationService } from "../services/notification.service";

interface UseNotificationUnreadCountProps {
  userId?: number;
  enabled?: boolean;
}

export const useNotificationUnreadCount = ({
  userId,
  enabled = true,
}: UseNotificationUnreadCountProps) => {
  return useQuery({
    queryKey: ["notificationUnreadCount", userId],
    queryFn: () => NotificationService.getUnreadCount(),
    staleTime: 1000 * 60, // 1분
    gcTime: 1000 * 60 * 5, // 5분
  });
};
