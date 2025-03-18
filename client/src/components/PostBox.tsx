"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Camera, Image } from "lucide-react";

const PostBox = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-2xl rounded-full h-10">Post</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" className="col-span-3" />
          </div>
        </div> */}
        <div className="border-b border-gray-200 p-4 flex gap-4">
          {/* 유저 프로필 이미지 */}
          <Avatar>
            <AvatarImage src="/profile.jpg" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          {/* 게시글 입력 박스 */}
          <div className="flex-1">
            <textarea
              placeholder="무슨 일이 일어나고 있나요?"
              className="w-full resize-none border-none focus:ring-0 text-lg min-h-[80px]"
            />
          </div>
        </div>

        {/* 버튼 & 추가 아이콘들 */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-3">
            {/* 추가 기능 아이콘 자리 (이미지 업로드, 이모지 등) */}
            <span className="cursor-pointer">
              <Image />
            </span>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">post</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostBox;
