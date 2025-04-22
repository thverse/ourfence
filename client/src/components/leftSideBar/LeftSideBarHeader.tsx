import { useRouter } from "next/navigation";

const LeftSideBarHeader = () => {
  const router = useRouter();

  return (
    <div
      className="flex justify-center items-center flex-col border-b-2 cursor-pointer"
      onClick={() => router.push("/")}
    >
      <div className="text-3xl font-bold pb-3">Ourfence</div>
    </div>
  );
};

export default LeftSideBarHeader;
