import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../user.service";
import { UserWithProfileResponse } from "shared";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

interface UseUserProfileProps {
  userId?: string;
}
interface UseCurrentUserProps {
  enabled?: boolean;
}
export function useUserProfile({ userId }: UseUserProfileProps = {}) {
  return useQuery<UserWithProfileResponse>({
    queryKey: ["user", userId],
    queryFn: () => getUserProfile(userId ?? ""),
    staleTime: 1000 * 60 * 10, //캐싱 10분
    retry: false,
    enabled: !!userId,
  });
}

export function useCurrentUser({ enabled }: UseCurrentUserProps = {}) {
  return useQuery<UserWithProfileResponse>({
    queryKey: ["user", "me"],
    queryFn: () => getUserProfile(""),
    staleTime: 1000 * 60 * 10,
    retry: false,
    enabled: !!enabled,
  });
}
