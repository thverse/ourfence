"use client";

import { Button } from "@/components/ui/button";
import { Camera, ImageIcon, UserIcon, X, Loader2 } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileFormData, profileFormData } from "../schemas/schema";
import useUpdateProfile from "../hooks/useUpdateProfile";
import { useModal } from "@/hooks/useModal";
import { UserWithProfileResponse } from "@ourfence/shared";

const ProfileEditDialog = ({ user }: { user: UserWithProfileResponse }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormData),
    defaultValues: {
      nickname: user?.userProfile?.nickname || "",
      bio: user?.userProfile?.bio || "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = form;

  const { updateProfile, isPending, isSuccess } = useUpdateProfile();

  const { isOpen, setIsOpen, handleClose } = useModal(isPending, () => {
    setProfileImage(null);
    setCoverImage(null);
    form.reset();
  });

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "cover"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      const setImage = type === "profile" ? setProfileImage : setCoverImage;
      setImage(blobUrl);
      setValue(`${type}Image`, file);
    }
  };

  const getImageUrl = (type: "profile" | "cover") => {
    if (user?.userProfile?.[`${type}ImageUrl`]) {
      return user.userProfile[`${type}ImageUrl`];
    }
    return null;
  };

  const onSubmit = (data: ProfileFormData) => {
    updateProfile(data);
  };

  // Blob URL 정리
  useEffect(() => {
    return () => {
      if (profileImage) URL.revokeObjectURL(profileImage);
      if (coverImage) URL.revokeObjectURL(coverImage);
    };
  }, [profileImage, coverImage]);

  useEffect(() => {
    if (isSuccess) {
      handleClose();
      setProfileImage(null);
      setCoverImage(null);
      form.reset();
    }
  }, [isSuccess]);

  return (
    <div>
      <Button
        variant="outline"
        size="lg"
        className="rounded-full font-bold"
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between items-center p-4 border-b">
                  <div className="flex items-center gap-8">
                    <X className="cursor-pointer" onClick={handleClose} />
                    <h2 className="text-xl font-bold">프로필 수정</h2>
                  </div>
                  <Button
                    className="rounded-full"
                    size="sm"
                    type="submit"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        저장 중...
                      </>
                    ) : (
                      "저장"
                    )}
                  </Button>
                </div>

                <div className="relative">
                  <div className="relative h-48 bg-gray-200">
                    {coverImage ? (
                      <Image
                        src={coverImage}
                        alt="Cover preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : getImageUrl("cover") ? (
                      <Image
                        src={getImageUrl("cover") || ""}
                        alt="Cover preview"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-70 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => coverInputRef.current?.click()}
                    disabled={isPending}
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                  <input
                    {...register("coverImage")}
                    type="file"
                    ref={coverInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "cover")}
                    disabled={isPending}
                  />
                </div>

                <div className="relative px-4">
                  <div className="relative -mt-16 mb-3">
                    <div className="relative w-32 h-32 rounded-full border-4 border-white bg-gray-200">
                      {profileImage ? (
                        <Image
                          src={profileImage}
                          alt="Profile preview"
                          fill
                          className="rounded-full object-cover"
                        />
                      ) : getImageUrl("profile") ? (
                        <Image
                          src={getImageUrl("profile") || ""}
                          alt="Profile preview"
                          fill
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full flex items-center justify-center">
                          <UserIcon className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      <button
                        type="button"
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-70 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => profileInputRef.current?.click()}
                        disabled={isPending}
                      >
                        <Camera className="w-5 h-5" />
                      </button>
                      <input
                        {...register("profileImage")}
                        type="file"
                        ref={profileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "profile")}
                        disabled={isPending}
                      />
                    </div>
                  </div>
                  {errors.profileImage && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.profileImage.message}
                    </p>
                  )}
                  {errors.coverImage && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.coverImage.message}
                    </p>
                  )}
                </div>

                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      닉네임
                    </label>
                    <input
                      {...register("nickname")}
                      type="text"
                      className="w-full p-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="닉네임을 입력하세요"
                      disabled={isPending}
                    />
                    {errors.nickname && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.nickname.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      자기소개
                    </label>
                    <textarea
                      {...register("bio")}
                      className="w-full p-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                      rows={3}
                      placeholder="자기소개를 입력하세요"
                      disabled={isPending}
                    />
                    {errors.bio && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.bio.message}
                      </p>
                    )}
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
