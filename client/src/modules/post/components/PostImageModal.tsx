// PostImageModal.tsx
import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface PostImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  alt?: string;
}

export default function PostImageModal({
  isOpen,
  onClose,
  imageUrl,
  alt = "Modal image",
}: PostImageModalProps) {
  // 스크롤 제어
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.documentElement.style.overflow = "hidden"; // html 스크롤 잠금
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.documentElement.style.overflow = "";
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 overflow-hidden"
      onClick={onClose}
    >
      <div className="relative max-w-[90vw] max-h-[90vh]">
        <Image
          src={imageUrl}
          width={1920}
          height={1080}
          className="object-contain w-auto h-auto max-w-full max-h-[90vh]"
          alt={alt}
          onClick={(e) => e.stopPropagation()}
          quality={85}
          sizes="90vw"
          priority
          unoptimized
        />
        <button
          className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
