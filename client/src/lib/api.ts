import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// 요청 실패 시 인터셉터 설정
apiClient.interceptors.response.use(
  (response) => response, // 응답이 정상적이면 그대로 반환
  async (error) => {
    if (error.response?.status === 401) {
      try {
        // Refresh Token을 사용하여 새로운 Access Token 요청
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/refreshtoken`,
          {},
          { withCredentials: true }
        );

        // 재요청 (Access Token이 갱신되었으므로 다시 호출)
        return apiClient.request(error.config);
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
