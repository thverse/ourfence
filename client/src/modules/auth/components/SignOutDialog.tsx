"use client";

import { useSignOut } from "@/modules/auth/hooks/useAuth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReactNode } from "react";

interface SignOutDialogProps {
  trigger: ReactNode;
  onOpenChange?: (open: boolean) => void;
}

export const SignOutDialog = ({
  trigger,
  onOpenChange,
}: SignOutDialogProps) => {
  const { mutate: signOut, isPending } = useSignOut();

  const handleSignOut = () => {
    signOut();
    onOpenChange?.(false);
  };

  return (
    <AlertDialog onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>로그아웃 하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription className="sr-only">
            로그아웃하면 다시 로그인해야 합니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSignOut}
            className="bg-red-500 hover:bg-red-600"
            disabled={isPending}
          >
            로그아웃
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
