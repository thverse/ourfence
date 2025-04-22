import { useQuery } from "@tanstack/react-query";
import { postService } from "../post.service";

interface UsePostProps {
  postId: number;
}

export const usePost = ({ postId }: UsePostProps) => {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => postService.getPost(postId),
    enabled: !!postId,
  });
};
