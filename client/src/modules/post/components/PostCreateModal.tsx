import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

interface PostCreateModalProps {
  title?: string;
  description?: string;
  buttonText?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: (formData: FormData) => void;
}

export default function PostCreateModal({
  title = "Dialog",
  description = "설명을 여기에 입력하세요.",
  buttonText = "post",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
}: PostCreateModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 이미지 파일인지 확인
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      // 파일 크기 체크 (예: 5MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("파일 크기는 10MB 이하여야 합니다.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    setSelectedImage(null);
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setSelectedImage(null);
      }
    };

    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.documentElement.style.overflow = "";
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <Button
        className="text-2xl rounded-full h-10"
        onClick={() => setIsOpen(true)}
      >
        {buttonText}
      </Button>
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setIsOpen(false)}
            ></div>

            <div className="bg-white p-4 rounded-lg shadow-lg z-10 w-full max-w-xl">
              <div className="flex justify-end">
                <X
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer"
                />
              </div>
              <div className="border-b border-gray-200 p-4 flex gap-4">
                <Avatar>
                  <AvatarImage src="/tb.png" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <textarea
                    placeholder="무슨 일이 일어나고 있나요?"
                    className="w-full resize-none focus:outline-none text-lg min-h-[200px]"
                    autoFocus
                  />

                  {/* 선택된 이미지 미리보기 */}
                  {selectedImage && (
                    <div className="relative mt-4">
                      <div className="relative w-full overflow-hidden rounded-lg">
                        <Image
                          src={selectedImage}
                          alt="Selected image"
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="w-full h-auto max-h-[500px] object-contain"
                          onLoadingComplete={(img) => {
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
                          }}
                        />
                      </div>
                      <button
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
                {/* 파일 입력 숨기기 */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />

                {/* 이미지 업로드 버튼 */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-600"
                >
                  <ImageIcon className="w-5 h-5" />
                </button>

                <Button type="submit" onClick={handleSubmit}>
                  post
                </Button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
