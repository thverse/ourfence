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
@Module({
  imports: [
    UserModule,
    AuthModule,
    PostModule,
    UploadModule,
    FollowModule,
    LikeModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
