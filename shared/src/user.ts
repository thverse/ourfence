// shared/types/user.ts에 추가할 내용
export interface User {
  id: number;
  username: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserProfile extends User {
  followers?: number;
  following?: number;
}
