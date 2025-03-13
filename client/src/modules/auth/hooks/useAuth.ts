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
      queryClient.setQueryData(["user"], data.user);
      router.push("/");
      toast.success("Welcome! Account created successfully.");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data?.message || "Sign up failed");
    },
  });
}

export function useSignIn() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.signIn,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      router.push("/");
      toast.success("Welcome Back! Account signed in successfully.");
    },
    onError: (error: AxiosError<any>) => {
      console.log(error);
      toast.error(error.response?.data?.message || "Sign ip failed");
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
      router.push("/");
      toast.success("You have successfully signed out of your account!");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data?.message || "Sign out failed");
    },
  });
}
