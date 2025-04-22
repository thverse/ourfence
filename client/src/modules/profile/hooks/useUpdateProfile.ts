import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfileFormData } from "../schemas/schema";
import { profileService } from "../services/profile.service";
import { toast } from "react-toastify";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (profileFormData: ProfileFormData) => {
      const formData = new FormData();
      formData.append("nickname", profileFormData.nickname);
      formData.append("bio", profileFormData.bio);
      if (profileFormData.profileImage) {
        formData.append("profileImage", profileFormData.profileImage);
      }
      if (profileFormData.coverImage) {
        formData.append("coverImage", profileFormData.coverImage);
      }

      // FormData 내용 확인 (디버깅용)
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      return profileService.updateProfile(formData);
    },
    onSuccess: (data) => {
      // 모든 user 관련 쿼리 무효화
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "user" || query.queryKey.includes("postList"),
      });
      toast.success("프로필이 업데이트되었습니다.");
    },
    onError: () => {
      toast.error("프로필 업데이트에 실패했습니다.");
    },
  });

  return { updateProfile: mutate, isPending, isSuccess };
};

export default useUpdateProfile;
