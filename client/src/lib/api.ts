import { authService } from "@/modules/auth/auth.service";
import axios from "axios";
import { toast } from "react-toastify";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

const excludedUrls = [
  `/api/signup`, // 회원가입 path
  `/api/signin`, // 로그인 path
  `/api/signout`, // 로그아웃 path
];

// 요청 실패 시 인터셉터 설정
apiClient.interceptors.response.use(
  (response) => response, // 응답이 정상적이면 그대로 반환
  async (error) => {
    const requestUrl = error.config?.url;

    // 로그인, 회원가입 API 요청 에러처리는 인터셉터에서 제외
    if (excludedUrls.includes(requestUrl)) {
      throw error;
    }
    if (error.response?.status === 401) {
      try {
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/refreshtoken`,
          {},
          { withCredentials: true }
        );

        // 리프레시 토큰이 없거나 만료되었다면 로그아웃 처리
        if (refreshResponse.status !== 200) {
          toast.error("리프레시 토큰이 유효하지 않거나 만료되었습니다.");
          throw error;
        }

        // 재요청 (Access Token이 갱신되었으므로 다시 호출)
        return await apiClient.request(error.config);
      } catch (refreshError) {
        toast.error("토큰 갱신에 실패했습니다.");
        throw refreshError;
      }
    }

    throw error;
  }
);
