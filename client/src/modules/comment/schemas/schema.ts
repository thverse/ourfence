import { z } from "zod";

export const commentCreateSchema = z.object({
  content: z
    .string()
    .min(1, "댓글 내용을 입력해주세요.")
    .max(100, "최대 100자까지 입력 가능합니다."),
});

export type CommentCreateFormData = z.infer<typeof commentCreateSchema>;
