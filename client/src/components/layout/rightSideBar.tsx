import { Button } from "../ui/button";

const RightSideBar = () => {
  return (
    <aside className="hidden lg:flex w-[350px] flex-col p-4 sticky top-0 h-screen">
      <div className="bg-gray-50 rounded-2xl">
        <h2 className="text-xl font-bold px-4 pt-3 pb-2">추천 사용자</h2>

        <div className="divide-y">
          <div className="px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold">KingGary</p>
                <p className="text-sm text-gray-500">@username</p>
              </div>
              <Button variant="outline" className="rounded-full">
                팔로우
              </Button>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 hover:bg-gray-100 transition-colors cursor-pointer rounded-b-2xl">
          <span className="text-primary">더 보기</span>
        </div>
      </div>
    </aside>
  );
};

export default RightSideBar;
