import Image from "next/image";

const Post = () => {
  return (
    <div className="p-4 border-y-[1px] border-gray-200">
      {/* POST CONTENT */}
      <div className="flex gap-4">
        {/* AVATAR */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image
            src="/avatar.png"
            width={100}
            height={100}
            alt="User avatar"
            priority
          />
        </div>
        {/* CONTENT */}
        <div className="flex-1">
          {/* TOP */}
          <div className="flex">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base font-bold">best1m</span>
              <span>1 day ago</span>
            </div>
          </div>
          {/* TEXT & MEDIA */}
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
          </p>
          <Image src="/testbg.jpg" width={500} height={500} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Post;
