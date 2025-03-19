import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Image, X } from "lucide-react";

interface PostDialogProps {
  title?: string;
  description?: string;
  buttonText?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: (formData: FormData) => void;
}

export default function PostDialog({
  title = "Dialog",
  description = "설명을 여기에 입력하세요.",
  buttonText = "post",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
}: PostDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
  };

  // Esc 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.documentElement.style.overflow = "hidden"; // html 스크롤 잠금
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
                {/* 유저 프로필 이미지 */}
                <Avatar>
                  <AvatarImage src="/tb.png" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>

                {/* 게시글 입력 박스 */}
                <div className="flex-1">
                  <textarea
                    placeholder="무슨 일이 일어나고 있나요?"
                    className="w-full resize-none focus:outline-none text-lg min-h-[200px] autofocus"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center pt-4">
                <Image className="cursor-pointer ml-2" width={20} height={20} />
                <Button type="submit">post</Button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
