import Image from "next/image";
import { Heart, MessageSquare } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Input } from "../../../components/ui/input";
import CommentSection from "@/modules/comments/components/CommentSection";

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

const Post = () => {
  return (
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
        <Image
          src={postInfo.imgUrl}
          width={500}
          height={500}
          className="rounded-2xl w-full"
          alt=""
        />

        {/* 액션 버튼 (좋아요, 리트윗, 댓글, 공유) */}
        <div className="flex mt-3 gap-10 text-gray-500">
          <button className="flex items-center gap-1 hover:text-blue-500">
            <MessageSquare className="w-5 h-5" />
            <span>12</span>
          </button>
          <button className="flex items-center gap-1 hover:text-red-500">
            <Heart className="w-5 h-5" />
            <span>45</span>
          </button>
        </div>
        <CommentSection />
      </div>
    </div>
  );
};

export default Post;
