import Link from "next/link";

const TopBar = () => {
  return (
    <div className="p-4 flex font-bold border-b-[1px] border-gray-200 top-0 sticky bg-white bg-opacity-90 z-10">
      <Link className="text-center flex-1 items-center " href="/">
        <span className="pb-3 border-b-4 border-blue-200">My Posts</span>
      </Link>
      <Link className="text-center flex-1 items-center " href="/">
        <span className="pb-3">Following</span>
      </Link>
    </div>
  );
};

export default TopBar;
