import React from "react";

type SectionHeaderProps = {
  pageTitle: string;
};

const SectionHeader = ({ pageTitle }: SectionHeaderProps) => {
  return (
    <div className="text-2xl font-bold p-4 border-b-gray-200 border-b sticky top-0 bg-white bg-opacity-90 z-10">
      {pageTitle}
    </div>
  );
};

export default SectionHeader;
