import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostModule } from 'src/post/post.module';
import { NotificationModule } from 'src/notification/notification.module';
@Module({
  imports: [PrismaModule, PostModule, NotificationModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
