// src/app/profile/[id]/follows/page.tsx
"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import TabBar from "@/components/TabBar";
import { useTabBarStore } from "@/app/store";
import { FollowList } from "@/modules/follow/components/FollowList";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
const FollowsPage = () => {
  const { id: userId } = useParams();
  const { selectedTabId, setSelectedTabId } = useTabBarStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  useEffect(() => {
    if (tab) {
      setSelectedTabId(tab);
    }
  }, [tab, setSelectedTabId]);

  const tabs = [
    {
      id: "followers",
      label: "팔로워",
      emptyMessageTitle: "아직 팔로워가 없습니다.",
      emptyMessageDescription: "다른 사용자를 팔로우하면 여기에 표시됩니다.",
    },
    {
      id: "following",
      label: "팔로잉",
      emptyMessageTitle: "아직 팔로잉하는 사용자가 없습니다.",
      emptyMessageDescription:
        "다른 사용자가 회원님을 팔로우하면 여기에 표시됩니다",
    },
  ];

  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center bg-white/90">
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-gray-200 rounded-full ml-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <TabBar
          items={tabs}
          initialActiveTab={selectedTabId || "followers"}
          className="flex-1"
        />
      </div>
      <FollowList
        userId={userId as string}
        emptyMessageTitle={
          tabs.find((tab) => tab.id === selectedTabId)?.emptyMessageTitle
        }
        emptyMessageDescription={
          tabs.find((tab) => tab.id === selectedTabId)?.emptyMessageDescription
        }
      />
    </div>
  );
};

export default FollowsPage;
