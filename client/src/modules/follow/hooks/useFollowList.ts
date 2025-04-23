import { useQuery } from "@tanstack/react-query";
import { followService } from "../services/follow.service";

export const useFollowerList = (userId: string) => {
  return useQuery({
    queryKey: ["followerList", userId],
    queryFn: () => followService.getFollowers(userId),
  });
};

export const useFollowingList = (userId: string) => {
  return useQuery({
    queryKey: ["followingList", userId],
    queryFn: () => followService.getFollowings(userId),
  });
};
