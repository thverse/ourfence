import Feed from "@/components/layout/Feed";
import TopBar from "@/components/layout/TopBar";
import { SignOutButton } from "@/modules/auth/components/signOutButton";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div>
      <TopBar />
      <Feed />
      <SignOutButton />
    </div>
  );
}
