import Image from "next/image";
import { Heart, MessageSquare, X } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Input } from "../../../components/ui/input";
import CommentSection from "@/modules/comments/components/CommentSection";
import { useState } from "react";
import PostImageModal from "./PostImageModal";
import { PostResponse } from "shared";
import { timeAgo } from "@/lib/utils";
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

const Post = ({ post }: { post: PostResponse }) => {
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = (img: HTMLImageElement) => {
    const ratio = img.naturalWidth / img.naturalHeight;
    setAspectRatio(ratio);
    setIsLoading(false);
  };

  const getAspectRatioClass = () => {
    if (aspectRatio === 1) {
      return "aspect-square"; // 1:1
    } else if (aspectRatio > 1) {
      return aspectRatio > 1.7
        ? "aspect-video" // 16:9
        : "aspect-[4/3]"; // 4:3
    } else {
      return aspectRatio < 0.6
        ? "aspect-[9/16]" // 9:16
        : "aspect-[3/4]"; // 3:4
    }
  };

  const setPostImage = () => {
    if (post.postImages && post.postImages.length > 0) {
      return post.postImages[0].url;
    }

    return "";
  };

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
              @{post.user?.username} · {timeAgo(post.createdAt)}
            </span>
          </div>
        </div>

        {/* 포스트 내용 */}
        <p className="mt-2 mb-2 text-gray-900">{post.content}</p>

        {/* 이미지 컨테이너 */}
        {post.postImages && post.postImages.length > 0 && (
          <div
            className={`
            relative 
            w-full 
            ${getAspectRatioClass()} 
            overflow-hidden 
            rounded-2xl 
            cursor-pointer
            transition-transform 
            duration-300
          `}
            onClick={() => setIsExpanded(true)}
          >
            <Image
              src={setPostImage()}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              alt="Post image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onLoadingComplete={(img) => handleImageLoad(img)}
              priority
            />
          </div>
        )}

        {/* 액션 버튼 */}
        <div className="flex mt-3 gap-10 text-gray-500">
          <button className="flex items-center gap-1 hover:text-blue-500">
            <MessageSquare className="w-5 h-5" />
            <span>{post._count?.comments}</span>
          </button>
          <button className="flex items-center gap-1 hover:text-red-500">
            <Heart className="w-5 h-5" />
            <span>{post._count?.likes}</span>
          </button>
        </div>

        <CommentSection />
      </div>

      {/* 모달 컴포넌트 */}
      <PostImageModal
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
        imageUrl={setPostImage()}
        alt="Expanded post image"
      />
    </div>
  );
};

export default Post;
