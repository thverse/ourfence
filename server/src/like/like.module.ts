import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [PrismaModule, PostModule],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
