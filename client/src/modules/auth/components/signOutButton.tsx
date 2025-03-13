"use client";

import { Button } from "@/components/ui/button";
import { useSignOut } from "../hooks/useAuth";

export function SignOutButton() {
  const { mutate: signOut, isPending } = useSignOut();

  const onSignOut = () => {
    signOut();
  };
  return (
    <Button onClick={() => onSignOut()} disabled={isPending}>
      Sign out
    </Button>
  );
}
