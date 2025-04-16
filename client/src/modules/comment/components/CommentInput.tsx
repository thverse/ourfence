import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import React from "react";

const user = {
  name: "기마무개",
  username: "kim",
  profileImage: "/avatar.png",
};

const CommentInput = () => {
  return (
    <div className="flex w-full gap-2">
      <Avatar className="z-0">
        <AvatarImage src={user.profileImage} alt={user.name} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <Input
          placeholder="Write and press enter key"
          className="h-10 rounded-2xl"
          autoFocus
        />
      </div>
    </div>
  );
};

export default CommentInput;
