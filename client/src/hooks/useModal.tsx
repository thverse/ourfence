import { useEffect, useState } from "react";

export const useModal = (isPending: boolean, onClose?: () => void) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    if (isPending) return;
    setIsOpen(false);
    onClose?.();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.documentElement.style.overflow = "";
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isPending]);

  return { isOpen, setIsOpen, handleClose };
};
