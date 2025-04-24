// notification/notification.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationService } from './notification.service';
import { UserNotFoundException } from 'src/user/exceptions/userNotFound.exception';
import { ReadNotificationDto } from './dto/notification.dto';
import { Notification } from '@prisma/client';
@WebSocketGateway({
  cors: {
    origin: '*', // 클라이언트 URL
    credentials: true, // 쿠키 사용을 위해 필수
  },
})
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private userSocketMap: Map<number, string> = new Map();

  constructor(private readonly notificationService: NotificationService) {}

  async handleConnection(client: Socket) {
    console.log('Client connected');
    try {
      // 쿠키에서 유저 정보 추출
      const userId = client.handshake.auth.userId;

      if (!userId) {
        throw new UserNotFoundException(userId);
      }

      this.userSocketMap.set(userId, client.id);

      // 읽지 않은 알림 수 전송
      const unreadCount = await this.notificationService.getUnreadCount(userId);
      client.emit('unread-count', unreadCount);
    } catch (error) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    for (const [userId, socketId] of this.userSocketMap.entries()) {
      if (socketId === client.id) {
        this.userSocketMap.delete(userId);
        break;
      }
    }
  }

  @SubscribeMessage('read-notification')
  async handleRead(client: Socket, readNotificationDto: ReadNotificationDto) {
    try {
      const userId = client.handshake.auth.userId;

      await this.notificationService.readNotification(readNotificationDto);

      const unreadCount = await this.notificationService.getUnreadCount(userId);
      client.emit('unread-count', unreadCount);
    } catch (error) {
      console.error('Error reading notification:', error);
    }
  }

  async sendNotification(userId: number, notification: Notification) {
    const socketId = this.userSocketMap.get(userId);
    if (socketId) {
      this.server.to(socketId).emit('notification', notification);

      const unreadCount = await this.notificationService.getUnreadCount(userId);
      this.server.to(socketId).emit('unread-count', unreadCount);
    }
  }
}
