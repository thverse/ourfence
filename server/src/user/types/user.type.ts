import { Prisma } from '@prisma/client';

// User에 UserProfile이 포함된 타입
type UserWithProfile = Prisma.UserGetPayload<{
  include: { userProfile: true };
}>;

export { UserWithProfile };
