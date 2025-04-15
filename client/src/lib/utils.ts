import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const timeAgo = (date: string | Date): string => {
  const now = new Date();
  const past = new Date(date);
  const diff = now.getTime() - past.getTime();

  // 밀리초 단위로 변환
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // X 플랫폼 스타일 시간 표시
  if (seconds < 60) {
    return `${seconds}초`;
  }

  if (minutes < 60) {
    return `${minutes}분`;
  }

  if (hours < 24) {
    return `${hours}시간`;
  }

  if (days < 7) {
    return `${days}일`;
  }

  // 같은 연도 내
  if (past.getFullYear() === now.getFullYear()) {
    return past.toLocaleDateString("ko", {
      month: "short",
      day: "numeric",
    });
  }

  // 다른 연도
  return past.toLocaleDateString("ko", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
