import { useRouter } from "next/navigation";

const LeftSideBarHeader = () => {
  const router = useRouter();

  return (
    <div
      className="flex justify-center flex-col cursor-pointer"
      onClick={() => router.push("/")}
    >
      <div className="text-3xl font-bold pb-3">Ourfence</div>
    </div>
  );
};

export default LeftSideBarHeader;
