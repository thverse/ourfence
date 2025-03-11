"use client";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export function useSignUp() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.signUp,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      router.push("/");
      toast.success("Welcome! Account created successfully.");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data?.message || "Sign up failed");
    },
  });
}
