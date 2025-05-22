"use client";
import { Button } from "@/components/ui/button";
import { useFollow } from "../hooks/useFollow";
import { useCurrentUser } from "@/modules/user/hooks/useUser";

interface FollowButtonProps {
  targetUserId: string;
  isFollowing: boolean;
}

const FollowButton = ({ targetUserId, isFollowing }: FollowButtonProps) => {
  const { data: currentUser } = useCurrentUser();
  const { toggleFollow, isPending } = useFollow(
    currentUser?.id.toString() ?? "",
    targetUserId,
    isFollowing
  );

  // 자기 자신을 팔로우할 수 없음
  if (currentUser?.id === parseInt(targetUserId)) {
    return null;
  }

  const handleFollow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleFollow();
  };

  return (
    <Button
      variant={isFollowing ? "outline" : "default"}
      onClick={handleFollow}
      disabled={isPending}
      size="lg"
      className="rounded-full font-bold"
    >
      {isFollowing ? "팔로잉" : "팔로우"}
    </Button>
  );
};

export default FollowButton;
