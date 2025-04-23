// src/modules/user/components/UserCard.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FollowButton from "@/modules/follow/components/FollowButton";
import { useUserProfile } from "@/modules/user/hooks/useUser";
import { UserWithProfileResponse } from "shared";
import Link from "next/link";

export const FollowUserItem = ({ userId }: { userId: string }) => {
  const { data: user } = useUserProfile({ userId });
  return (
    <div className="flex items-start justify-between px-4 py-3 hover:bg-accent/5 cursor-pointer border-b border-border">
      <Link href={`/profile/${user?.id}`} className="flex flex-1 gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={user?.userProfile?.profileImageUrl ?? ""}
            alt={user?.username ?? ""}
          />
          <AvatarFallback>{user?.username?.[0] ?? ""}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex flex-col leading-5">
              <span className="font-bold text-base hover:underline truncate">
                {user?.userProfile?.nickname ?? ""}
              </span>
              <span className="text-sm text-muted-foreground truncate">
                @{user?.username ?? ""}
              </span>
            </div>
            <FollowButton
              targetUserId={user?.id?.toString() ?? ""}
              isFollowing={user?.isFollowing ?? false}
            />
          </div>
          {user?.userProfile?.bio && (
            <p className="text-sm mt-1 text-foreground/90 line-clamp-2">
              {user?.userProfile?.bio}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
};
