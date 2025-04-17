import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { timeAgo } from "@/lib/utils";
import React from "react";
import { CommentResponse } from "shared";

const CommentItem = ({ comment }: { comment: CommentResponse }) => {
  return (
    <div className="flex w-full gap-2">
      <Avatar className="z-0">
        <AvatarImage
          src={comment.user.userProfile?.profileImageUrl ?? ""}
          alt={comment.user.username}
        />
        <AvatarFallback>{comment.user.username}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex flex-col justify-center bg-gray-50 rounded-2xl py-1 px-3">
          <div>
            <span className="font-bold pr-1">{comment.user.username}</span>
            <span className="text-sm text-gray-500">
              {timeAgo(comment.createdAt)}
            </span>
          </div>
          <p>{comment.content}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
