import { useEffect } from "react";

export const useScrollToTop = (triggers: any[]) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, triggers);
};
