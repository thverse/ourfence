import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type SectionHeaderProps = {
  pageTitle: string;
};

const SectionHeader = ({ pageTitle }: SectionHeaderProps) => {
  const router = useRouter();
  return (
    <div className="text-2xl font-bold p-4 border-b-gray-200 border-b sticky top-0 bg-white bg-opacity-90 z-10">
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-gray-200 rounded-full ml-2"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-5 h-5" />
      </Button>
      {pageTitle}
    </div>
  );
};

export default SectionHeader;
