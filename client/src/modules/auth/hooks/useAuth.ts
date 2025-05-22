"use client";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../auth.service";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export function useSignUp() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.signUp,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], "me");
      router.push("/");
      toast.success("환영합니다! 계정이 성공적으로 생성되었습니다.");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data?.message || "회원가입에 실패했습니다.");
    },
  });
}

export function useSignIn() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.signIn,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], "me");
      router.push("/");
      toast.success("환영합니다! 로그인되었습니다.");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data?.message || "로그인에 실패했습니다.");
    },
  });
}

export function useSignOut() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.signOut,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      router.push("/signin");
      toast.success("로그아웃되었습니다.");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data?.message || "로그아웃에 실패했습니다.");
    },
  });
}
