import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

const user = {
  name: "기마무개",
  username: "kim",
  profileImage: "/avatar.png",
};

const CommentItem = () => {
  return (
    <div className="flex w-full gap-2">
      <Avatar className="z-0">
        <AvatarImage src={user.profileImage} alt={user.name} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex flex-col justify-center bg-gray-50 rounded-2xl py-1 px-3">
          <div>
            <span className="font-bold pr-1">User</span>
            <span className="text-sm text-gray-500">10m</span>
          </div>
          <p>comment........................</p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
