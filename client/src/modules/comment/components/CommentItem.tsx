import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { timeAgo } from "@/lib/utils";
import { CommentResponse } from "@ourfence/shared";
import { useCommentDelete } from "../hooks/useCommentDelete";
import { DeleteAlertDialog } from "@/components/DeleteAlertDialog";
import { useCurrentUser } from "@/modules/user/hooks/useUser";
import { useRouter } from "next/navigation";

const CommentItem = ({ comment }: { comment: CommentResponse }) => {
  const { mutate: deleteComment } = useCommentDelete(comment.id);
  const { data: user } = useCurrentUser();
  const router = useRouter();

  return (
    <div className="flex w-full gap-2">
      <div className="flex items-center justify-center">
        <Avatar
          className="z-0 cursor-pointer hover:opacity-80"
          onClick={() => router.push(`/profile/${comment.user.id}`)}
        >
          <AvatarImage
            src={comment.user.userProfile?.profileImageUrl ?? ""}
            alt={comment.user.userProfile?.nickname ?? ""}
          />
          <AvatarFallback>{comment.user.username[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1">
        <div className="flex flex-col justify-center bg-gray-50 rounded-2xl py-1 px-3">
          <div className="flex">
            <div className="font-bold pr-1 flex items-center">
              {comment.user.userProfile?.nickname}
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              · {timeAgo(comment.createdAt)}
            </div>
            {comment.user.id === user?.id && (
              <div className="flex flex-1">
                <DeleteAlertDialog
                  onDelete={deleteComment}
                  title="댓글을 삭제하시겠습니까?"
                  description="이 작업은 되돌릴 수 없습니다. 댓글이 영구적으로
                삭제됩니다."
                />
              </div>
            )}
          </div>
          <p>{comment.content}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
