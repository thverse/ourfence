import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface LeftSideBarMenuItemProps {
  title: string;
  path: string;
  icon: LucideIcon;
}
const LeftSideBarMenuItem = ({
  title,
  path,
  icon: Icon,
}: LeftSideBarMenuItemProps) => {
  return (
    <div className="flex justify-center hover:bg-gray-200 rounded-3xl p-2 w-fit">
      <Link className="" href={path}>
        <div className="flex items-center gap-2 text-2xl">
          <Icon size={25} /> <span>{title}</span>
        </div>
      </Link>
    </div>
  );
};

export default LeftSideBarMenuItem;
