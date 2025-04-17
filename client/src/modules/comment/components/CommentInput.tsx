import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useCommentCreate } from "../hooks/useCommentCreate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  commentCreateSchema,
  type CommentCreateFormData,
} from "../schemas/schema";
import { toast } from "react-toastify";

const user = {
  name: "기마무개",
  username: "kim",
  profileImage: "/avatar.png",
};

const CommentInput = ({ postId }: { postId: number }) => {
  const { createComment, isPending } = useCommentCreate();

  const form = useForm<CommentCreateFormData>({
    resolver: zodResolver(commentCreateSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const [lastCommentTime, setLastCommentTime] = useState<number>(0);

  const onSubmit = (data: CommentCreateFormData) => {
    const now = Date.now();
    if (now - lastCommentTime < 30000) {
      // 30초
      toast.error(
        `${Math.floor(
          30 - (now - lastCommentTime) / 1000
        )}초 후 다시 시도해주세요.`
      );
      return;
    }
    setLastCommentTime(now);

    createComment({ content: data.content, postId });
    form.reset();
  };

  return (
    <div className="flex w-full gap-2">
      <Avatar className="z-0">
        <AvatarImage src={user.profileImage} alt={user.name} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="내용을 입력후 엔터를 눌러 댓글을 작성해주세요."
            className="h-10 rounded-2xl"
            autoFocus
            {...register("content")}
            disabled={isPending}
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {errors.content.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CommentInput;
