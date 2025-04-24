import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React, { ReactNode } from "react";

interface LeftSideBarMenuItemProps {
  title: string;
  path: string;
  icon?: LucideIcon;
  customIcon?: ReactNode;
  iconSize?: number;
}
const LeftSideBarMenuItem = ({
  title,
  path,
  icon: Icon,
  customIcon,
  iconSize,
}: LeftSideBarMenuItemProps) => {
  const renderIcon = () => {
    if (customIcon) return customIcon;
    if (Icon) return <Icon size={iconSize} />;

    return null;
  };

  return (
    <Link
      className="flex justify-center hover:bg-gray-200 rounded-3xl p-2 w-fit"
      href={path}
    >
      <div className="flex items-center gap-2 text-2xl">
        {renderIcon()} <span>{title}</span>
      </div>
    </Link>
  );
};

export default LeftSideBarMenuItem;
