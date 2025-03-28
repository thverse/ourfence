import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../user.service";
import { User } from "shared";
export function useUser(options: { enabled?: boolean } = {}) {
  return useQuery<User>({
    queryKey: ["user"],
    queryFn: getUserProfile,
    staleTime: 1000 * 60 * 10, //캐싱 10분
    retry: false,
    enabled: options.enabled,
  });
}
