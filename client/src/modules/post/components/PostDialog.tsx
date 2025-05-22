"use client";

import { useState, ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePostCreate } from "../hooks/usePostCreate";
import { useTabBarStore } from "@/app/store";
import { PostType } from "../types/post.type";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PostDialog({ isOpen, onClose }: PostDialogProps) {
  const [content, setContent] = useState("");
  const { selectedTabId } = useTabBarStore();
  const { createPost, isLoading } = usePostCreate({
    onSuccess: () => {
      setContent("");
      onClose();
    },
  });

  const handleSubmit = () => {
    if (!content.trim()) return;
    createPost({ content });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isLoading && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>게시물 작성</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <textarea
            placeholder="무슨 일이 일어나고 있나요?"
            value={content}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setContent(e.target.value)
            }
            disabled={isLoading}
            className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={!content.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                게시 중...
              </>
            ) : (
              "게시하기"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
