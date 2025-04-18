"use client";

import { Button } from "@/components/ui/button";
import { Camera, X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

const ProfileEditDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const backgroundInputRef = useRef<HTMLInputElement>(null);

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
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setProfileImage(null);
    setBackgroundImage(null);
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "background"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Blob URL 생성
      const blobUrl = URL.createObjectURL(file);
      if (type === "profile") {
        setProfileImage(blobUrl);
      } else {
        setBackgroundImage(blobUrl);
      }
    }
  };

  // Blob URL 정리
  useEffect(() => {
    return () => {
      if (profileImage) URL.revokeObjectURL(profileImage);
      if (backgroundImage) URL.revokeObjectURL(backgroundImage);
    };
  }, [profileImage, backgroundImage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에 제출 로직 추가
    handleClose();
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
              onClick={handleClose}
            ></div>

            <div className="bg-white rounded-2xl shadow-lg z-10 w-full max-w-xl overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center gap-8">
                  <X className="cursor-pointer" onClick={handleClose} />
                  <h2 className="text-xl font-bold">프로필 수정</h2>
                </div>
                <Button
                  className="rounded-full"
                  size="sm"
                  onClick={handleSubmit}
                >
                  저장
                </Button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="relative">
                  <div className="relative h-48 bg-gray-200">
                    {backgroundImage && (
                      <Image
                        src={backgroundImage}
                        alt="Background preview"
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-70"
                    onClick={() => backgroundInputRef.current?.click()}
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                  <input
                    type="file"
                    ref={backgroundInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "background")}
                  />
                </div>

                <div className="relative px-4">
                  <div className="relative -mt-16 mb-3">
                    <div className="relative w-32 h-32 rounded-full border-4 border-white bg-gray-200">
                      {profileImage && (
                        <Image
                          src={profileImage}
                          alt="Profile preview"
                          fill
                          className="rounded-full object-cover"
                        />
                      )}
                      <button
                        type="button"
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-70"
                        onClick={() => profileInputRef.current?.click()}
                      >
                        <Camera className="w-5 h-5" />
                      </button>
                      <input
                        type="file"
                        ref={profileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "profile")}
                      />
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
