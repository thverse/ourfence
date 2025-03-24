export interface TopBarProps {
  itemType: TopBarItemType;
  items: [
    {
      handleFunction: () => {};
    },
    {
      handleFunction: () => {};
    }
  ];
}

export type TopBarItemType = "myPosts" | "followingsPosts";
