import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { NotificationResponse } from "shared";
import { useReadNotification } from "../hooks/useReadNotification";
import { NotificationType } from "../types/noticiation.type";
import { cn } from "@/lib/utils";
const NotificationItem = ({
  notification,
}: {
  notification: NotificationResponse;
}) => {
  const router = useRouter();
  const { mutate: readNotification } = useReadNotification({
    userId: notification.userId,
  });

  interface NotificationInfo {
    message: React.ReactNode;
    icon: React.ReactNode;
    onClick: () => void;
  }

  const getNotificationInfo = (
    type: NotificationType,
    nickname: string,
    referenceId?: number,
    router?: ReturnType<typeof useRouter>
  ): NotificationInfo => {
    const createMessage = (text: string) => (
      <div>
        <span className="font-bold text-black">{nickname}</span>
        님이 {text}
      </div>
    );

    const createIcon = (
      Icon: typeof Heart | typeof MessageCircle | typeof UserPlus
    ) => <Icon size={25} className="mt-2" />;

    switch (type) {
      case "COMMENT":
        return {
          icon: createIcon(MessageCircle),
          message: createMessage("내 글에 댓글을 남겼습니다."),
          onClick: () => {
            router?.push(`/post/${referenceId}`);
            readNotification(notification.id);
          },
        };

      case "LIKE":
        return {
          icon: createIcon(Heart),
          message: createMessage("내 글을 좋아합니다."),
          onClick: () => {
            router?.push(`/post/${referenceId}`);
            readNotification(notification.id);
          },
        };

      case "FOLLOW":
        return {
          icon: createIcon(UserPlus),
          message: createMessage("나를 팔로우 하기 시작했습니다."),
          onClick: () => {
            router?.push(`/profile/${notification.sender.id}`);
            readNotification(notification.id);
          },
        };

      default:
        return {
          icon: null,
          message: null,
          onClick: () => {},
        };
    }
  };
  return (
    <div
      className={cn(
        "flex gap-2 border-b border-gray-200 p-4 cursor-pointer",
        notification.isRead ? "bg-white" : "bg-blue-50"
      )}
      onClick={() => {
        getNotificationInfo(
          notification.type as NotificationType,
          notification.sender.userProfile.nickname,
          notification.referenceId,
          router
        ).onClick();
      }}
    >
      {
        getNotificationInfo(
          notification.type as NotificationType,
          notification.sender.userProfile.nickname,
          notification.referenceId
        ).icon
      }
      <Avatar>
        <AvatarImage
          src={notification.sender.userProfile.profileImageUrl}
          alt={notification.sender.userProfile.nickname}
          width={80}
          height={80}
          className="rounded-full z-0"
        />
        <AvatarFallback>
          {notification.sender.userProfile.nickname[0]}
        </AvatarFallback>
      </Avatar>
      <div className="text-gray-500 flex items-center">
        {
          getNotificationInfo(
            notification.type as NotificationType,
            notification.sender.userProfile.nickname,
            notification.referenceId
          ).message
        }
      </div>
    </div>
  );
};

export default NotificationItem;
