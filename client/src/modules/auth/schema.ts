import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(3, "아이디는 3자 이상이어야 합니다"),
  nickname: z.string().min(3, "닉네임은 3자 이상이어야 합니다"),
  email: z.string().email("유효한 이메일 주소를 입력해주세요"),
  password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다"),
});

export const signInSchema = z.object({
  username: z.string().min(3, "아이디는 3자 이상이어야 합니다"),
  password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다"),
});

export type SignUpFormSchema = z.infer<typeof signUpSchema>;
export type SignInSchema = z.infer<typeof signInSchema>;
