import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  imports: [PrismaModule],
  providers: [NotificationGateway, NotificationService],
  exports: [NotificationGateway, NotificationService],
})
export class NotificationModule {}
