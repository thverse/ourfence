"use client";

import { useTabBarStore } from "@/app/store";
import { TabBarProps } from "@/types/tabBarType";
import clsx from "clsx";
import { useEffect } from "react";

const TabBar = ({ items, initialActiveTab, className }: TabBarProps) => {
  const { selectedTabId, setSelectedTabId } = useTabBarStore();

  const handleActiveTab = (tabId: string) => {
    if (selectedTabId === tabId) return;
    setSelectedTabId(tabId);
  };

  // 컴포넌트 마운트 시 한 번만 실행
  useEffect(() => {
    const initialTab = initialActiveTab || items[0].id;
    setSelectedTabId(initialTab);
  }, []);

  return (
    <div
      className={clsx(
        "flex font-bold border-b-[1px] h-14 border-gray-200 bg-white bg-opacity-90 z-10",
        className
      )}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-center h-full text-center flex-1 cursor-pointer hover:bg-gray-200"
          onClick={() => handleActiveTab(item.id)}
        >
          <span
            className={clsx(
              "p-4 border-b-4",
              selectedTabId === item.id
                ? "border-blue-300"
                : "border-transparent"
            )}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TabBar;
