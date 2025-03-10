"use client";
import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/auth.service";

export function useRegister() {
  const router = useRouter();
  const queryClient = useQueryClient();

  //   return useMutation({
  //     mutationFn: authService.signUp,
  //     onSuccess: (data) => {
  //       queryClient.setQueryData(["user"], data.user);
  //       router.push("/");
  //       toast({
  //         title: "Welcome!",
  //         description: `Account created successfully`,
  //       });
  //     },
  //     onError: (error: any) => {
  //       toast({
  //         variant: "destructive",
  //         title: "Oops!",
  //         description: error.response?.data?.message || "Registration failed",
  //       });
  //     },
  //   });
}
