import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { timeAgo } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { CommentResponse } from "shared";
import { useCommentDelete } from "../hooks/useCommentDelete";

const CommentItem = ({ comment }: { comment: CommentResponse }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: deleteComment } = useCommentDelete(comment.id);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const handleDelete = () => {
    deleteComment();
    setIsOpen(false);
  };
  return (
    <div className="flex w-full gap-2">
      <div className="flex items-center justify-center">
        <Avatar className="z-0">
          <AvatarImage
            src={comment.user.userProfile?.profileImageUrl ?? ""}
            alt={comment.user.username}
          />
          <AvatarFallback>{comment.user.username[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1">
        <div className="flex flex-col justify-center bg-gray-50 rounded-2xl py-1 px-3">
          <div className="flex">
            <div className="font-bold pr-1 flex items-center">
              {comment.user.username}
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              · {timeAgo(comment.createdAt)}
            </div>
            <div className="flex flex-1 justify-end">
              <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      댓글을 삭제하시겠습니까?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      이 작업은 되돌릴 수 없습니다. 댓글이 영구적으로
                      삭제됩니다.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>취소</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      삭제
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <p>{comment.content}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
