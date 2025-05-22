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
      variant="ghost"
      className="bg-white hover:bg-gray-100 text-black [&_svg]:!size-6 p-2"
    >
      <LogOut />
    </Button>
  );
}
