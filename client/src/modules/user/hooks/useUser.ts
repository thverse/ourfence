import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../user.service";
import { UserWithProfileResponse } from "@ourfence/shared";
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
    // 파라미터를 넣지않은 이유는 nestjs 서버에서
    // 쿠키로 현재 유저를 조회하는 것이기 때문에 파라미터가 필요없음
    queryFn: () => getUserProfile(""),
    staleTime: 1000 * 60 * 10,
    retry: false,
    enabled: !!enabled,
  });
}
