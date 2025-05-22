import { use, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Image as ImageIcon, X, Pencil, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postCreateSchema, type PostCreateFormData } from "../schema";
import { usePostCreate } from "../hooks/usePostCreate";
import { useCurrentUser } from "@/modules/user/hooks/useUser";
import { cn } from "@/lib/utils";

interface PostCreateModalProps {
  buttonText?: string;
}

export default function PostCreateModal({
  buttonText = "post",
}: PostCreateModalProps) {
  const { data: currentUser } = useCurrentUser();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<PostCreateFormData>({
    resolver: zodResolver(postCreateSchema),
  });

  const closeModal = (reset: boolean = true) => {
    if (isLoading) return;
    setIsOpen(false);
    if (reset) {
      form.reset();
      removeImage();
    }
  };

  const closeModalOnSuccess = () => {
    setIsOpen(false);
    form.reset();
    removeImage();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = form;

  const { createPost, isLoading } = usePostCreate({
    onSuccess: closeModalOnSuccess,
  });

  const onSubmit = (data: PostCreateFormData) => {
    createPost(data);
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const ratio = img.naturalWidth / img.naturalHeight;
    const container = img.parentElement;
    if (container) {
      if (ratio > 1) {
        container.className =
          "relative w-full aspect-video overflow-hidden rounded-lg";
      } else {
        container.className =
          "relative w-full aspect-square overflow-hidden rounded-lg";
      }
    }
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file); // base64 대신 Blob URL 생성
      setSelectedImage(blobUrl); // 미리보기용 이미지로 설정
      setValue("image", file);
    }
  };

  const removeImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setSelectedImage(null);
    setValue("image", undefined);
    clearErrors("image");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.documentElement.style.overflow = "";
      removeImage();
      form.reset();
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <Button
        className={cn(
          // 모바일 스타일 (기본)
          "w-14 h-14 p-0 flex items-center justify-center rounded-full",
          "bg-black/30 text-white",
          "shadow-sm transition-colors",
          // 데스크톱 스타일
          "md:w-auto md:px-4 md:py-3",
          "md:flex md:items-center md:gap-2",
          "md:font-bold md:text-base md:bg-black"
        )}
        onClick={() => setIsOpen(true)}
      >
        <Pencil size={24} className="md:hidden" />
        <span className="hidden md:inline">{buttonText}</span>
      </Button>
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={(e) => {
                e.stopPropagation();
                if (!isLoading) closeModal(false);
              }}
            ></div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white p-4 rounded-lg shadow-lg z-10 w-full max-w-xl"
            >
              <div className="flex justify-end">
                <X
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isLoading) closeModal(false);
                  }}
                  className="cursor-pointer"
                />
              </div>
              <div className="border-b border-gray-200 p-4 flex gap-4">
                <Avatar>
                  <AvatarImage
                    src={currentUser?.userProfile?.profileImageUrl ?? ""}
                    alt="User"
                  />
                  <AvatarFallback>
                    {currentUser?.username?.[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <textarea
                    {...register("content")}
                    placeholder="무슨 일이 일어나고 있나요?"
                    className="w-full resize-none focus:outline-none text-lg min-h-[200px]"
                    autoFocus
                  />
                  {errors.content && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.content.message}
                    </p>
                  )}
                  {errors.image && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.image.message}
                    </p>
                  )}
                  {selectedImage && (
                    <div className="relative mt-4">
                      <div className="relative w-full overflow-hidden rounded-lg">
                        <Image
                          src={selectedImage}
                          alt="Selected image"
                          width={0}
                          height={0}
                          className="w-full h-auto max-h-[500px] object-contain"
                          sizes="100vw"
                          onLoad={handleImageLoad}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-600"
                >
                  <ImageIcon className="w-5 h-5" />
                </button>

                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      게시 중...
                    </>
                  ) : (
                    "게시"
                  )}
                </Button>
              </div>
            </form>
          </div>,
          document.body
        )}
    </>
  );
}
