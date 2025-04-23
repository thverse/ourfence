// src/modules/user/hooks/useFollow.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { followService } from "../services/follow.service";
import { toast } from "react-toastify";

export const useFollow = (targetUserId: string, isFollowing: boolean) => {
  const queryClient = useQueryClient();

  const { mutate: toggleFollow, isPending } = useMutation({
    mutationFn: () => {
      return isFollowing
        ? followService.unfollow(targetUserId)
        : followService.follow(targetUserId);
    },
    onSuccess: () => {
      // 팔로우 상태 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ["user", targetUserId],
      });

      // 팔로우 상태 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ["user", "me"],
      });

      // 팔로워/팔로잉 목록 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ["followerList", targetUserId],
      });
      queryClient.invalidateQueries({
        queryKey: ["followingList", targetUserId],
      });

      toast.success(isFollowing ? "팔로우를 취소했습니다." : "팔로우했습니다.");
    },
    onError: () => {
      toast.error("팔로우 처리 중 오류가 발생했습니다.");
    },
  });

  return {
    toggleFollow,
    isPending,
    isFollowing,
  };
};
