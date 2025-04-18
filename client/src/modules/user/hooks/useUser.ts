import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../user.service";
import { UserWithProfileResponse } from "shared";
import { useParams } from "next/navigation";

interface UseUserProps {
  userId?: string;
}
export function useUser({ userId }: UseUserProps = {}) {
  return useQuery<UserWithProfileResponse>({
    queryKey: ["user", userId],
    queryFn: () => getUserProfile(userId ?? ""),
    staleTime: 1000 * 60 * 10, //캐싱 10분
    retry: false,
  });
}
