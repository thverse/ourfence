import { create } from "zustand";

interface TabBarState {
  selectedTabId: string;
  setSelectedTabId: (id: string) => void;
}

export const useTabBarStore = create<TabBarState>((set) => ({
  selectedTabId: "",
  setSelectedTabId: (id: string) => set({ selectedTabId: id }),
}));
