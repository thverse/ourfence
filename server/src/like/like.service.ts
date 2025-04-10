import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLikeDto, DeleteLikeDto } from './dto/like.dto';
import { Like } from '@prisma/client';

@Injectable()
export class LikeService {
  constructor(private readonly prismaService: PrismaService) {}
  async likePost(createLikeDto: CreateLikeDto): Promise<Like> {
    const { userId, postId } = createLikeDto;

    return await this.prismaService.like.create({
      data: { userId, postId },
    });
  }

  async deleteLikePost(deleteLikeDto: DeleteLikeDto): Promise<boolean> {
    const { userId, postId } = deleteLikeDto;

    const result = await this.prismaService.like.deleteMany({
      where: { userId, postId },
    });

    return result.count > 0 ? true : false;
  }

  async getLikePostCount(postId: number): Promise<number> {
    return await this.prismaService.like.count({ where: { postId } });
  }
}
