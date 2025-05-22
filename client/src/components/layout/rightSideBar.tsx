import { Github } from "lucide-react";

const RightSideBar = () => {
  const githubUrl = "https://github.com/thverse/ourfence";

  const handleClick = () => {
    window.open(githubUrl, "_blank");
  };

  return (
    <aside className="hidden lg:flex w-[350px] flex-col p-4 sticky top-0 h-screen">
      <div className="bg-gray-50 rounded-2xl">
        <h2 className="text-xl font-bold px-4 pt-3 pb-2">Repository</h2>

        <div className="px-4 py-3">
          <div
            className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={handleClick}
          >
            <Github className="w-5 h-5 text-gray-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-500">GitHub</p>
              <p className="font-medium truncate">{githubUrl}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default RightSideBar;
