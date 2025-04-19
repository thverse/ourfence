export type PostConditionFunction = (userId: number) => Record<string, any>;

export enum PostType {
  ME = 'me',
  LIKE = 'like',
  FOLLOW = 'follow',
  COMMENT = 'comment',
}
