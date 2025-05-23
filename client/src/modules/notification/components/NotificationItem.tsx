import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { NotificationResponse } from "@ourfence/shared";
import { useReadNotification } from "../hooks/useReadNotification";
import { NotificationType } from "../types/noticiation.type";
import { cn } from "@/lib/utils";

interface NotificationInfo {
  message: React.ReactNode;
  icon: React.ReactNode;
  path: string;
}

const NOTIFICATION_CONFIG: Record<
  NotificationType,
  {
    message: string;
    icon: typeof Heart | typeof MessageCircle | typeof UserPlus;
    getPath: (notification: NotificationResponse) => string;
  }
> = {
  COMMENT: {
    message: "내 글에 댓글을 남겼습니다.",
    icon: MessageCircle,
    getPath: (notification) => `/post/${notification.referenceId}`,
  },
  LIKE: {
    message: "내 글을 좋아합니다.",
    icon: Heart,
    getPath: (notification) => `/post/${notification.referenceId}`,
  },
  FOLLOW: {
    message: "나를 팔로우 하기 시작했습니다.",
    icon: UserPlus,
    getPath: (notification) => `/profile/${notification.sender.id}`,
  },
  MENTION: {
    message: "",
    icon: MessageCircle,
    getPath: () => "",
  },
};

const NotificationItem = ({
  notification,
}: {
  notification: NotificationResponse;
}) => {
  const router = useRouter();
  const { mutate: readNotification } = useReadNotification({
    userId: notification.userId,
  });

  const getNotificationInfo = (): NotificationInfo => {
    const type = notification.type as NotificationType;
    const config = NOTIFICATION_CONFIG[type];

    if (!config) {
      return {
        icon: null,
        message: null,
        path: "",
      };
    }

    const Icon = config.icon;
    const message = (
      <div>
        <span className="font-bold text-black">
          {notification.sender.userProfile.nickname}
        </span>
        님이 {config.message}
      </div>
    );

    return {
      icon: <Icon size={25} className="mt-2" />,
      message,
      path: config.getPath(notification),
    };
  };

  const handleNotificationClick = () => {
    const { path } = getNotificationInfo();
    if (path) {
      readNotification(notification.id, {
        onSuccess: () => {
          router.push(path);
        },
      });
    }
  };

  const { icon, message } = getNotificationInfo();

  return (
    <div
      className={cn(
        "flex gap-2 border-b border-gray-200 p-4 cursor-pointer",
        notification.isRead ? "bg-white" : "bg-blue-50"
      )}
      onClick={handleNotificationClick}
    >
      {icon}
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
      <div className="text-gray-500 flex items-center">{message}</div>
    </div>
  );
};

export default NotificationItem;
