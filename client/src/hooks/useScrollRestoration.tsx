import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const useScrollRestoration = () => {
  const pathname = usePathname();

  // 현재 스크롤 위치 저장
  const saveScrollPosition = () => {
    sessionStorage.setItem(
      `scrollPosition_${pathname}`,
      window.scrollY.toString()
    );
  };

  // 스크롤 위치 복원
  const restoreScrollPosition = () => {
    const savedPosition = sessionStorage.getItem(`scrollPosition_${pathname}`);
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition));
    }
  };

  useEffect(() => {
    // 페이지 언마운트 시 스크롤 위치 저장
    return () => {
      saveScrollPosition();
    };
  }, [pathname]);

  return { saveScrollPosition, restoreScrollPosition };
};
