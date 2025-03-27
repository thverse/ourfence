"use client";

import { Button } from "@/components/ui/button";
import { useSignOut } from "../hooks/useAuth";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  const { mutate: signOut, isPending } = useSignOut();

  return (
    <Button
      onClick={() => signOut()}
      disabled={isPending}
      className="bg-gray-300 hover:bg-gray-400 text-black"
    >
      <LogOut />
    </Button>
  );
}
