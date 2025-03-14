import Feed from "@/components/layout/Feed";
import { SignOutButton } from "@/modules/auth/components/signOutButton";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="px-4 p-2 flex font-bold border-b-[1px] border-green-200">
        <Link className="text-center pb-3 flex-1 items-center " href="/">
          <span className="pb-2 border-b-4 border-blue-200">My Posts</span>
        </Link>
        <Link className="text-center pb-3 flex-1 items-center " href="/">
          <span className="pb-2">Following</span>
        </Link>
      </div>
      <Feed />
      {/* <SignOutButton /> */}
    </div>
  );
}
