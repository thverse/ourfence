import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followService } from "../services/follow.service";
import { toast } from "react-toastify";

export const useFollow = (
  currentUserId: string,
  targetUserId: string,
  isFollowing: boolean
) => {
  const queryClient = useQueryClient();

  const { mutate: toggleFollow, isPending } = useMutation({
    mutationFn: () => {
      return isFollowing
        ? followService.unfollow(targetUserId)
        : followService.follow(targetUserId);
    },

    onMutate: async () => {
      // 쿼리 취소
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ["user", targetUserId] }),
        queryClient.cancelQueries({ queryKey: ["user", "me"] }),
        queryClient.cancelQueries({ queryKey: ["followerList", targetUserId] }),
        queryClient.cancelQueries({
          queryKey: ["followingList", currentUserId],
        }),
      ]);

      // 이전 데이터 저장
      const previousTargetUser = queryClient.getQueryData<any>([
        "user",
        targetUserId,
      ]);
      const previousMe = queryClient.getQueryData<any>(["user", "me"]);
      const previousFollowerList = queryClient.getQueryData<any[]>([
        "followerList",
        targetUserId,
      ]);
      const previousFollowingList = queryClient.getQueryData<any[]>([
        "followingList",
        currentUserId,
      ]);

      // 낙관적 업데이트: 대상 유저
      if (previousTargetUser) {
        queryClient.setQueryData(["user", targetUserId], {
          ...previousTargetUser,
          isFollowedByMe: !isFollowing,
          followerCount: isFollowing
            ? previousTargetUser.followerCount - 1
            : previousTargetUser.followerCount + 1,
        });
      }

      // 낙관적 업데이트: 나
      if (previousMe) {
        queryClient.setQueryData(["user", "me"], {
          ...previousMe,
          followingCount: isFollowing
            ? previousMe.followingCount - 1
            : previousMe.followingCount + 1,
        });
      }

      // 낙관적 업데이트: followerList
      if (previousFollowerList) {
        const updatedFollowerList = isFollowing
          ? previousFollowerList.filter((user) => user.id !== previousMe?.id)
          : [...previousFollowerList, previousMe];
        queryClient.setQueryData(
          ["followerList", targetUserId],
          updatedFollowerList
        );
      }

      // 낙관적 업데이트: followingList
      if (previousFollowingList) {
        const updatedFollowingList = isFollowing
          ? previousFollowingList.filter((user) => user.id !== targetUserId)
          : [...previousFollowingList, previousTargetUser];
        queryClient.setQueryData(
          ["followingList", currentUserId],
          updatedFollowingList
        );
      }

      return {
        previousTargetUser,
        previousMe,
        previousFollowerList,
        previousFollowingList,
      };
    },

    onError: (_err, _vars, context) => {
      if (!context) return;

      queryClient.setQueryData(
        ["user", targetUserId],
        context.previousTargetUser
      );
      queryClient.setQueryData(["user", "me"], context.previousMe);
      queryClient.setQueryData(
        ["followerList", targetUserId],
        context.previousFollowerList
      );
      queryClient.setQueryData(
        ["followingList", currentUserId],
        context.previousFollowingList
      );

      toast.error("팔로우 처리 중 오류가 발생했습니다.");
    },

    onSuccess: () => {
      toast.success(isFollowing ? "팔로우를 취소했습니다." : "팔로우했습니다.");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["user", targetUserId] });
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
      queryClient.invalidateQueries({
        queryKey: ["followerList", targetUserId],
      });
      queryClient.invalidateQueries({
        queryKey: ["followingList", currentUserId],
      });
    },
  });

  return {
    toggleFollow,
    isPending,
    isFollowing,
  };
};
