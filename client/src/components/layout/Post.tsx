import Image from "next/image";
import { Heart, MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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
      <Avatar>
        <AvatarImage
          src={user.profileImage}
          alt={user.name}
          width={12}
          height={12}
          className="rounded-full"
        />
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
          style={{ borderRadius: "10px" }}
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
      </div>
    </div>
  );
};
// const Post = () => {
//   return (
//     <div className="p-4 border-y-[1px] border-gray-200">
//       {/* POST CONTENT */}
//       <div className="flex gap-4">
//         {/* AVATAR */}
//         <div className="relative w-10 h-10 rounded-full overflow-hidden">
//           <Image
//             src="/avatar.png"
//             width={100}
//             height={100}
//             alt="User avatar"
//             priority
//           />
//         </div>
//         {/* CONTENT */}
//         <div className="flex-1">
//           {/* TOP */}
//           <div className="flex">
//             <div className="flex items-center gap-2 flex-wrap">
//               <span className="text-base font-bold">best1m</span>
//               <span>1 day ago</span>
//             </div>
//           </div>
//           {/* TEXT & MEDIA */}
//           <p>
//             Lorem Ipsum is simply dummy text of the printing and typesetting
//             industry. Lorem Ipsum has been the industry's standard dummy text
//           </p>
//           <Image src="/testbg.jpg" width={500} height={500} alt="" />
//         </div>
//       </div>
//     </div>
//   );
// };

export default Post;
