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
      <DialogContent className="sm:max-w-[600px] p-3">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="border-b border-gray-200 p-4 flex gap-4">
          {/* 유저 프로필 이미지 */}
          <Avatar>
            <AvatarImage src="/tb.png" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          {/* 게시글 입력 박스 */}
          <div className="flex-1">
            <textarea
              placeholder="무슨 일이 일어나고 있나요?"
              className="w-full resize-none focus:outline-none text-lg min-h-[200px] autofocus"
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Image className="cursor-pointer ml-2" width={20} height={20} />
          <Button type="submit">post</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostBox;
