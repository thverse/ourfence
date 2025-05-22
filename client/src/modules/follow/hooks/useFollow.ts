import { useMutation, useQueryClient } from "@tanstack/react-query";
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

    onMutate: async () => {
      // 모든 관련 쿼리 취소
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ["user", targetUserId] }),
        queryClient.cancelQueries({ queryKey: ["user", "me"] }),
        queryClient.cancelQueries({ queryKey: ["followerList", targetUserId] }),
        queryClient.cancelQueries({
          queryKey: ["followingList", targetUserId],
        }),
      ]);

      // 이전 상태 저장
      const previousTargetUser = queryClient.getQueryData<any>([
        "user",
        targetUserId,
      ]);
      const previousMe = queryClient.getQueryData<any>(["user", "me"]);

      // 낙관적 업데이트
      if (previousTargetUser) {
        queryClient.setQueryData(["user", targetUserId], {
          ...previousTargetUser,
          isFollowedByMe: !isFollowing,
          followerCount: isFollowing
            ? previousTargetUser.followerCount - 1
            : previousTargetUser.followerCount + 1,
        });
      }

      if (previousMe) {
        queryClient.setQueryData(["user", "me"], {
          ...previousMe,
          followingCount: isFollowing
            ? previousMe.followingCount - 1
            : previousMe.followingCount + 1,
        });
      }

      return { previousTargetUser, previousMe };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousTargetUser) {
        queryClient.setQueryData(
          ["user", targetUserId],
          context.previousTargetUser
        );
      }
      if (context?.previousMe) {
        queryClient.setQueryData(["user", "me"], context.previousMe);
      }
      toast.error("팔로우 처리 중 오류가 발생했습니다.");
    },

    onSuccess: () => {
      toast.success(isFollowing ? "팔로우를 취소했습니다." : "팔로우했습니다.");
    },

    onSettled: () => {
      // 서버 응답 후 정확한 데이터 유지
      queryClient.invalidateQueries({ queryKey: ["user", targetUserId] });
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      queryClient.invalidateQueries({
        queryKey: ["followerList", targetUserId],
      });
      queryClient.invalidateQueries({
        queryKey: ["followingList", targetUserId],
      });
    },
  });

  return {
    toggleFollow,
    isPending,
    isFollowing,
  };
};
