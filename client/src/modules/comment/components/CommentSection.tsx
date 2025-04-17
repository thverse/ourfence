import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";
import { useGetCommentList } from "../hooks/useCommentList";

interface CommentSectionProps {
  postId: number;
}

const CommentSection = ({ postId }: CommentSectionProps) => {
  const { data: commentList } = useGetCommentList(postId);
  return (
    <div className="flex flex-col gap-2 pt-3">
      <CommentInput postId={postId} />
      {commentList?.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentSection;
