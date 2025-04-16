import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import React from "react";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";

const user = {
  name: "기마무개",
  username: "kim",
  profileImage: "/avatar.png",
};

const CommentSection = () => {
  return (
    <div className="flex flex-col gap-2 pt-3">
      <CommentInput />
      <CommentItem />
    </div>
  );
};

export default CommentSection;
