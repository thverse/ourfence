import { Loader } from "lucide-react";
const ScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Loader className="h-12 w-12" />
    </div>
  );
};

export default ScreenLoader;
