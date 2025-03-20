import { create } from "zustand";

interface TopBarState {
  selectedTopBarItem: TopBarItemType;
  setSelectTopBarItem: (item: TopBarItemType) => void;
}

export const useTopBarStore = create<TopBarState>((set) => ({
  selectedTopBarItem: "myPosts",
  setSelectTopBarItem: (item) => set((state) => ({ selectedTopBarItem: item })),
}));
