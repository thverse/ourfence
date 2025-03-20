import SectionHeader from "@/components/SectionHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { notFound } from "next/navigation";
import React from "react";

interface ConnetionsProps {
  params: Promise<{ type: string }>;
}

const user = {
  name: "기마무개",
  username: "kim",
  profileImage: "/avatar.png",
};

const postInfo = {
  content: "안녕하세요 이것은 ...!!",
  imgUrl: "/testbg.jpg",
  createdAt: "2 hours ago",
};
const ConnectionsPage = async ({ params }: ConnetionsProps) => {
  const { type } = await params;

  if (type !== "followers" && type !== "following") {
    return notFound();
  }

  return (
    <div>
      <SectionHeader pageTitle={type} />
      <div className="p-4 flex gap-4 border-b border-gray-200">
        {/* 프로필 이미지 */}
        <Avatar className="z-0">
          <AvatarImage src={user.profileImage} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>

        {/* 오른쪽 콘텐츠 영역 */}
        <div className="flex-1">
          {/* 사용자 정보 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{user.name}</span>
              <span className="text-gray-500">
                @{user.username} · {postInfo.createdAt}
              </span>
            </div>
          </div>

          {/* 포스트 내용 */}
          <p className="mt-2 mb-2 text-gray-900">{postInfo.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ConnectionsPage;
