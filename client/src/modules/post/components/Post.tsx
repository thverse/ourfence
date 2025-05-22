import Image from "next/image";
import { ArrowLeft, Heart, MessageSquare, X } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import CommentSection from "@/modules/comment/components/CommentSection";
import { useState } from "react";
import PostImageModal from "./PostImageModal";
import { timeAgo } from "@/lib/utils";
import { PostResponse } from "@ourfence/shared";
import { DeleteAlertDialog } from "@/components/DeleteAlertDialog";
import { usePostDelete } from "../hooks/usePostDelete";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/modules/user/hooks/useUser";
import { Button } from "@/components/ui/button";
import { usePostLike } from "../hooks/usePostLike";

interface PostProps {
  post: PostResponse;
  isDetail?: boolean;
  onBack?: () => void;
}

const Post = ({ post, isDetail = false, onBack }: PostProps) => {
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { data: currentUser } = useCurrentUser();
  const { mutate: deletePost } = usePostDelete(post.id);
  const router = useRouter();

  const handlePostClick = () => {
    if (!isDetail) {
      router.push(`/post/${post.id}`);
    }
  };

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

  const { toggleLike, isPending: isLikeLoading } = usePostLike(post);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLikeLoading) {
      toggleLike();
    }
  };

  return (
    <div>
      {/* 상세페이지일 때만 헤더 표시 */}
      {isDetail && (
        <div className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur">
          <div className="flex items-center gap-6 p-4">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-200 rounded-full"
              onClick={onBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">게시물</h1>
          </div>
        </div>
      )}

      <div
        className={`p-4 flex gap-4 border-b border-gray-200 ${
          !isDetail && "cursor-pointer"
        }`}
        onClick={handlePostClick}
      >
        {/* 기존 Post 컴포넌트 내용 */}
        <Avatar
          className="z-0 cursor-pointer hover:opacity-80"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/profile/${post.user?.id}`);
          }}
        >
          <AvatarImage
            src={post.user?.userProfile?.profileImageUrl ?? ""}
            alt={post.user?.userProfile?.nickname ?? ""}
          />
          <AvatarFallback>{post.user?.username[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-2 cursor-pointer hover:opacity-80"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/profile/${post.user?.id}`);
              }}
            >
              <span className="font-semibold">
                {post.user?.userProfile?.nickname}
              </span>
              <span className="text-gray-500">
                @{post.user?.username} · {timeAgo(post.createdAt)}
              </span>
            </div>
            {post.user?.id === currentUser?.id && (
              <div
                className="flex flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <DeleteAlertDialog
                  onDelete={() => {
                    deletePost();
                    if (isDetail) {
                      router.push("/");
                    }
                  }}
                  title="게시물을 삭제하시겠습니까?"
                  description="이 작업은 되돌릴 수 없습니다. 게시물이 영구적으로 삭제됩니다."
                />
              </div>
            )}
          </div>

          <p className={`mb-2 text-gray-900 ${isDetail && "text-xl"}`}>
            {post.content}
          </p>

          {post.postImages && post.postImages.length > 0 && (
            <div
              className={`
                relative 
                w-full 
                ${getAspectRatioClass()} 
                overflow-hidden 
                rounded-2xl 
                ${!isDetail && "cursor-pointer"}
                transition-transform 
                duration-300
              `}
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(true);
              }}
            >
              <Image
                src={post.postImages[0].url}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                alt="Post image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onLoadingComplete={(img) => handleImageLoad(img)}
                priority
                unoptimized
              />
            </div>
          )}

          <div className="flex mt-3 gap-3 text-gray-500">
            <button className="flex items-center gap-1 hover:text-blue-500">
              <MessageSquare className="w-5 h-5" />
              <span>{post._count?.comments}</span>
            </button>
            <button
              className={`flex items-center gap-1 hover:text-red-500 ${
                post.isCurrentUserLiked ? "text-red-500" : ""
              }`}
              onClick={handleLikeClick}
              disabled={isLikeLoading}
            >
              <Heart
                className={`w-5 h-5 ${
                  post.isCurrentUserLiked ? "fill-current" : ""
                }`}
              />
              <span>{post._count?.likes}</span>
            </button>
          </div>

          {/* 상세페이지일 때만 댓글 섹션 표시 */}
          {isDetail && <CommentSection postId={post.id} />}
        </div>
      </div>

      <PostImageModal
        isOpen={isExpanded}
        onClose={() => setIsExpanded(false)}
        imageUrl={post.postImages?.[0]?.url || ""}
        alt="Expanded post image"
      />
    </div>
  );
};

export default Post;
