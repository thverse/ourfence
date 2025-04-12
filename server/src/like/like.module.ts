import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostModule } from 'src/post/post.module';
import { NotificationModule } from 'src/notification/notification.module';
@Module({
  imports: [PrismaModule, PostModule, NotificationModule],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
