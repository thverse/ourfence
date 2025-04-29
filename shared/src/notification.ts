export interface NotificationResponse {
  id: number;
  userId: number;
  senderUserId: number;
  type: string;
  content: string;
  referenceId: number;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  sender: {
    id: number;
    username: string;
    userProfile: {
      profileImageUrl: string;
      nickname: string;
    };
  };
}
