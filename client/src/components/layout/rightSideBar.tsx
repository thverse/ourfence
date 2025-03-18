import { Button } from "../ui/button";

const RightSideBar = () => {
  return (
    <aside className="hidden lg:flex flex-col w-64 p-4 sticky top-0 h-screen">
      <h2 className="text-lg font-bold mb-4">추천 사용자</h2>
      <div className="space-y-2">
        <Button variant="outline" className="w-full">
          @user1
        </Button>
        <Button variant="outline" className="w-full">
          @user2
        </Button>
        <Button variant="outline" className="w-full">
          @user3
        </Button>
      </div>
    </aside>
  );
};

export default RightSideBar;
