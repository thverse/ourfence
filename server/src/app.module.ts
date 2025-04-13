import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PostModule } from './post/post.module';
import { UploadModule } from './upload/upload.module';
import { FollowModule } from './follow/follow.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';
import { PrismaModule } from './prisma/prisma.module';
import { NotificationModule } from './notification/notification.module';
import { SearchModule } from './search/search.module';
@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    PostModule,
    UploadModule,
    FollowModule,
    LikeModule,
    CommentModule,
    NotificationModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
