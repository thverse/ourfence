"use client";

import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const ProfileEditDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.documentElement.style.overflow = "";
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
  };
  return (
    <div>
      <Button
        className="rounded-full"
        size="sm"
        onClick={() => setIsOpen(true)}
      >
        프로필 수정
      </Button>
      {isOpen &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setIsOpen(false)}
            ></div>

            <div className="bg-white rounded-2xl shadow-lg z-10 w-full max-w-xl overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center gap-8">
                  <X
                    className="cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  />
                  <h2 className="text-xl font-bold">프로필 수정</h2>
                </div>
                <Button className="rounded-full" size="sm">
                  저장
                </Button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="relative">
                  <div className="h-48 bg-gray-200"></div>
                  <button
                    type="button"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white p-2 rounded-full"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                </div>

                <div className="relative px-4">
                  <div className="relative -mt-16 mb-3">
                    <div className="relative w-32 h-32 rounded-full border-4 border-white bg-gray-200">
                      <button
                        type="button"
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white p-2 rounded-full"
                      >
                        <Camera className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      이름
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      placeholder="이름을 입력하세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      자기소개
                    </label>
                    <textarea
                      className="w-full p-2 border rounded-md"
                      rows={3}
                      placeholder="자기소개를 입력하세요"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default ProfileEditDialog;
