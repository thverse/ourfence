import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

const user = {
  name: "기마무개",
  username: "kim",
  profileImage: "/tb.png",
};

const LeftSideBarHeader = () => {
  return (
    <div className="flex justify-center items-center flex-col border-b-2">
      <div className="text-3xl font-bold pb-10">Ourfence</div>
      <div className="flex flex-col justify-center items-center">
        <Avatar className="w-20 h-20">
          <AvatarImage
            src={user.profileImage}
            alt={user.name}
            className="rounded-full"
          />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="font-bold pt-2">{user.name}</div>
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
