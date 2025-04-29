import { useQuery } from "@tanstack/react-query";
import { NotificationService } from "../services/notification.service";

interface UseNotificationListProps {
  userId?: number;
  enabled: boolean;
}

export const useNotificationList = ({
  userId,
  enabled = true,
}: UseNotificationListProps) => {
  return useQuery({
    queryKey: ["notificationList", userId],
    queryFn: () => NotificationService.getNotificationList(),
    enabled,
    staleTime: 1000 * 60, // 1분
    gcTime: 1000 * 60 * 5, // 5분
  });
};
