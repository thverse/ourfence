"use client";

import TabBar from "@/components/TabBar";
import React, { useEffect, useState } from "react";
import { useTabBarStore } from "@/app/store";
import SectionHeader from "@/components/SectionHeader";
import Post from "@/modules/post/components/Post";
import { Button } from "@/components/ui/button";
import { Pencil, X, Camera } from "lucide-react";
import { createPortal } from "react-dom";

const ProfilePage = () => {
  const { setSelectedTabId } = useTabBarStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedTabId("posts");
  }, [setSelectedTabId]);

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

  const profileTabs = [
    {
      id: "posts",
      label: "게시물",
    },
    {
      id: "likes",
      label: "좋아요",
    },
    {
      id: "comments",
      label: "댓글",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
  };

  return (
    <div>
      <div>
        {/* 헤더 */}
        <SectionHeader pageTitle="My Profile" />

        {/* 커버 이미지 */}
        <div className="h-48 bg-gray-200">{/* 커버 이미지 들어갈 자리 */}</div>

        {/* 프로필 정보 */}
        <div className="px-4 pb-4">
          {/* 프로필 이미지 - 커버 이미지와 겹치게 */}
          <div className="relative -mt-16 mb-3">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200">
              {/* 프로필 이미지 들어갈 자리 */}
            </div>
          </div>

          {/* 사용자 정보 */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">사용자 이름</h2>
              <p className="text-gray-500">@username</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
              <Pencil className="w-4 h-4 mr-2" />
              프로필 수정
            </Button>
          </div>

          {/* 팔로우 정보 */}
          <div className="flex gap-4 text-sm text-gray-500">
            <span>100 팔로잉</span>
            <span>200 팔로워</span>
          </div>
        </div>
      </div>

      {/* 탭바 */}
      <TabBar items={profileTabs} initialActiveTab="posts" />

      {/* 탭 컨텐츠 */}
      <div className="divide-y">
        <Post />
        <Post />
        <Post />
      </div>

      {isOpen &&
        createPortal(
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setIsOpen(false)}
            ></div>

            <div className="bg-white rounded-2xl shadow-lg z-10 w-full max-w-xl overflow-hidden">
              {/* 모달 헤더 */}
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
                {/* 배경 이미지 섹션 */}
                <div className="relative">
                  <div className="h-48 bg-gray-200">
                    {/* 배경 이미지가 들어갈 자리 */}
                  </div>
                  <button
                    type="button"
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white p-2 rounded-full"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                </div>

                {/* 프로필 이미지 섹션 */}
                <div className="relative px-4">
                  <div className="relative -mt-16 mb-3">
                    <div className="relative w-32 h-32 rounded-full border-4 border-white bg-gray-200">
                      {/* 프로필 이미지가 들어갈 자리 */}
                      <button
                        type="button"
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white p-2 rounded-full"
                      >
                        <Camera className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 프로필 정보 입력 폼 */}
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      위치
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      placeholder="위치를 입력하세요"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      웹사이트
                    </label>
                    <input
                      type="url"
                      className="w-full p-2 border rounded-md"
                      placeholder="웹사이트 URL을 입력하세요"
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

export default ProfilePage;
