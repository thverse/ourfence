import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { useUser } from "@/modules/user/hooks/useUser";

const user = {
  name: "기마무개",
  username: "kim",
  profileImage: "/tb.png",
};

const LeftSideBarHeader = () => {
  const { data: user } = useUser();

  return (
    <div className="flex justify-center items-center flex-col border-b-2">
      <div className="text-3xl font-bold pb-10">Ourfence</div>
      <div className="flex flex-col justify-center items-center">
        <Avatar className="w-20 h-20">
          <AvatarImage src={""} alt={user?.username} className="rounded-full" />
          <AvatarFallback>{user?.username[0]}</AvatarFallback>
        </Avatar>
        <div className="font-bold pt-2">{user?.username}</div>
      </div>
      <div className="flex justify-between items-center pt-5 pb-5 w-full">
        <Link href="/" className="flex flex-col items-center">
          <div className="font-bold text-xl">1</div>
          <div>posts</div>
        </Link>
        <Link href="/followers" className="flex flex-col items-center">
          <div className="font-bold text-xl">1</div>
          <div>followers</div>
        </Link>
        <Link href="/following" className="flex flex-col items-center">
          <div className="font-bold text-xl">1</div>
          <div>following</div>
        </Link>
      </div>
    </div>
  );
};

export default LeftSideBarHeader;
