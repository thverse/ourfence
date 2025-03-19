import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart } from "lucide-react";
import React from "react";

const user = {
  name: "기마디",
  username: "kim",
  profileImage: "/tb.png",
};

const NotificationItem = () => {
  return (
    <div className="flex gap-2 border-b border-gray-200 p-4 cursor-pointer">
      <Heart size={25} className="mt-2" />
      <div className="flex-1">
        <Avatar>
          <AvatarImage
            src={user.profileImage}
            alt={user.name}
            width={80}
            height={80}
            className="rounded-full z-0"
          />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="font-bold">User님이 내 글을 마음에 들어 합니다.</div>
        <div className="text-gray-500">
          내용dsadadasdasdsadadsadasdasdassadads (댓글이라면)
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
