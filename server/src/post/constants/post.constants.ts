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
          followerId: userId,
        },
      },
    },
  }),
  [PostType.COMMENT]: (userId) => ({
    comments: { some: { userId } },
  }),
};
