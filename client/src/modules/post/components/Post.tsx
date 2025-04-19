import Image from "next/image";
import { Heart, MessageSquare, X } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Input } from "../../../components/ui/input";
import CommentSection from "@/modules/comment/components/CommentSection";
import { useState } from "react";
import PostImageModal from "./PostImageModal";
import { timeAgo } from "@/lib/utils";
import { PostResponse } from "shared";
import { useUser } from "@/modules/user/hooks/useUser";
import { DeleteAlertDialog } from "@/components/DeleteAlertDialog";
import { usePostDelete } from "../hooks/usePostDelete";
import { useRouter } from "next/navigation";
const Post = ({ post }: { post: PostResponse }) => {
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data: user } = useUser({ userId: post.user.id.toString() });

  const { mutate: deletePost } = usePostDelete(post.id);

  const router = useRouter();

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
      <Avatar
        className="z-0 cursor-pointer hover:opacity-80"
        onClick={() => router.push(`/profile/${post.user?.id}`)}
      >
        <AvatarImage
          src={post.user?.userProfile?.profileImageUrl ?? ""}
          alt={post.user?.username ?? ""}
        />
        <AvatarFallback>{post.user?.username[0]}</AvatarFallback>
      </Avatar>

      {/* 오른쪽 콘텐츠 영역 */}
      <div className="flex-1">
        {/* 사용자 정보 */}
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer hover:opacity-80"
            onClick={() => router.push(`/profile/${post.user?.id}`)}
          >
            <span className="font-semibold">{post.user?.username}</span>
            <span className="text-gray-500">
              @{post.user?.username} · {timeAgo(post.createdAt)}
            </span>
          </div>
          {post.user?.id === user?.id && (
            <div className="flex flex-1 justify-end">
              <DeleteAlertDialog
                onDelete={deletePost}
                title="게시물을 삭제하시겠습니까?"
                description="이 작업은 되돌릴 수 없습니다. 게시물이 영구적으로
                        삭제됩니다."
              />
            </div>
          )}
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
        <CommentSection postId={post.id} />
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
