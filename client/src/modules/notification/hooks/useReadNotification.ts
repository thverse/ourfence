import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NotificationService } from "../services/notification.service";
import { toast } from "react-toastify";

interface UseReadNotificationProps {
  userId: number;
}

export const useReadNotification = ({ userId }: UseReadNotificationProps) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: NotificationService.readNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notificationList", userId] });
      queryClient.invalidateQueries({
        queryKey: ["notificationUnreadCount", userId],
      });
    },
    onError: (error) => {
      toast.error("알림 읽기 실패");
    },
  });
};
