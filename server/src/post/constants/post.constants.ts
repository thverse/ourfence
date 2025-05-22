import { PostConditionFunction, PostType } from '../types/post.type';

export const POST_TYPE_CONDITIONS: Record<PostType, PostConditionFunction> = {
  [PostType.ME]: (userId) => ({
    userId,
  }),
  [PostType.LIKE]: (userId) => ({
    likes: { some: { userId } },
  }),
  [PostType.FOLLOW]: (userId) => ({
    user: {
      followers: {
        some: {
          followingId: userId,
        },
      },
    },
  }),
  [PostType.COMMENT]: (userId) => ({
    comments: { some: { userId } },
  }),
  [PostType.RECOMMEND]: (userId) => ({
    //전체 불러오기후 서비스 함수에서 조건 추가
  }),
};
