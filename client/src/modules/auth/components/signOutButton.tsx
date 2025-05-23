"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { SignOutDialog } from "./SignOutDialog";
import { useState } from "react";

export function SignOutButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SignOutDialog
      trigger={
        <Button
          variant="ghost"
          className="bg-white hover:bg-gray-100 text-black [&_svg]:!size-6 p-2"
        >
          <LogOut />
        </Button>
      }
      onOpenChange={setIsOpen}
    />
  );
}
