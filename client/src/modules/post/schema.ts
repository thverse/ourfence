import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const postCreateSchema = z.object({
  content: z
    .string()
    .min(1, "내용을 입력해주세요.")
    .max(200, "최대 200자까지 입력 가능합니다."),
  image: z
    .custom<File>()
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      `파일 크기는 ${MAX_FILE_SIZE / 1024 / 1024}MB 이하여야 합니다.`
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "JPG, PNG, WEBP 형식의 이미지만 업로드 가능합니다."
    ),
});

export type PostCreateFormData = z.infer<typeof postCreateSchema>;
