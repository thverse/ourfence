import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../user.service";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUserProfile,
    staleTime: 1000 * 60 * 10, //캐싱 10분
    retry: false,
  });
}
