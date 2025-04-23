import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare, hash } from 'bcryptjs';
import {
  DuplicateCheckUserDto,
  UserCreateDto,
  UserProfileUpdateDto,
  UserUpdateDto,
  ValidateUserDto,
} from './dto/user.dto';
import { User, UserProfile, Prisma } from '@prisma/client';
import {
  UserProfileResponse,
  UserProfileUpdateResponse,
  UserResponse,
  UserWithProfileResponse,
} from 'shared';
import { UploadService } from 'src/upload/upload.service';
import { UserWithProfile } from './types/user.type';
import { DuplicateNicknameException } from './exceptions/duplicateNickname.exception';
import { ImageType } from 'src/upload/types/upload.type';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  async createUser(dto: UserCreateDto): Promise<User> {
    //중복 검사
    await this.duplicateCheckUser(dto);

    const user = await this.prismaService.user.create({
      data: {
        username: dto.username,
        email: dto.email,
        password: await hash(dto.password, 10),
        userProfile: {
          create: {
            nickname: dto.nickname,
          },
        },
      },
      include: {
        userProfile: true,
      },
    });

    // await this.prismaService.userProfile.create({
    //   data: {
    //     userId: user.id,
    //     nickname: dto.nickname,
    //   },
    // });

    return user;
  }

  async getUsers(): Promise<User[]> {
    const result = await this.prismaService.user.findMany();
    return result;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          username,
        },
      });
      return user;
    } catch (error) {
      return null;
    }
  }

  async getUserProfile(
    currentUserId: number,
    targetUserId?: number,
  ): Promise<UserWithProfileResponse> {
    // targetUserId 있을때는 targetUserId를 우선으로 사용
    const userId = targetUserId || currentUserId;

    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        userProfile: true,
        _count: {
          select: {
            followers: true,
            followings: true,
          },
        },
        followers: true,
        followings: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Not found user');
    }

    const isFollowing = user.followers.some(
      (follower) => follower.followingId === currentUserId,
    );

    return {
      ...user,
      isFollowing,
    };
  }

  async getUserById(id: number): Promise<User | null> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
      });
      return user;
    } catch (error) {
      return null;
    }
  }

  async getUserByIdWithProfile(id: number): Promise<UserWithProfile | null> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
        include: {
          userProfile: true,
        },
      });
      return user;
    } catch (error) {
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });
      return user;
    } catch (error) {
      return null;
    }
  }

  async updateUser(id: number, userUpdateDto: UserUpdateDto): Promise<User> {
    const { username, email, password, refreshToken } = userUpdateDto;
    let condition;
    if (username) {
      condition = { username };
    } else if (email) {
      condition = { email };
    } else if (password) {
      condition = { password };
    } else if (refreshToken) {
      condition = { refreshToken };
    }

    const user = await this.getUserById(id);

    if (!user) {
      throw new NotFoundException('Not found user');
    }

    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: condition,
    });
  }

  async deleteRefreshToken(id: number): Promise<User> {
    return await this.prismaService.user.update({
      where: { id },
      data: { refreshToken: null },
    });
  }

  async deleteUser(id: number): Promise<User> {
    const user = await this.getUserById(id);

    if (!user) {
      throw new NotFoundException('Not found user');
    }

    return await this.prismaService.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async duplicateCheckUser(
    duplicateCheckUserDto: DuplicateCheckUserDto,
  ): Promise<void> {
    const { username, email } = duplicateCheckUserDto;
    const getUserByUsername = await this.getUserByUsername(username);
    const getUserByemail = await this.getUserByEmail(email);

    if (getUserByUsername || getUserByemail) {
      throw new ConflictException('User already exists.');
    }
  }

  async validateUser(dto: ValidateUserDto): Promise<User> {
    const user = await this.getUserByUsername(dto.username);

    if (!user) {
      throw new UnauthorizedException('Please check your username or email.');
    }

    const isPasswordWrong = !(await compare(dto.password, user.password));
    if (isPasswordWrong) {
      throw new UnauthorizedException('Please check your password');
    }

    return user;
  }

  async updateUserProfile(
    userId: number,
    updateUserProfileDto: UserProfileUpdateDto,
    images: {
      profileImage: Express.Multer.File[];
      coverImage: Express.Multer.File[];
    },
  ): Promise<UserProfileUpdateResponse> {
    const user = await this.getUserByIdWithProfile(userId);

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    // 프로필 업데이트를 위한 데이터 준비
    const updateData: Partial<UserProfile> = {};

    // 닉네임 업데이트
    if (updateUserProfileDto.nickname) {
      // 닉네임 중복 체크
      const existingNickname = await this.prismaService.userProfile.findFirst({
        where: {
          nickname: updateUserProfileDto.nickname,
          user: { id: { not: userId } },
        },
      });

      if (existingNickname) {
        throw new DuplicateNicknameException(updateUserProfileDto.nickname);
      }
      updateData.nickname = updateUserProfileDto.nickname;
    }

    // 자기소개 업데이트
    if (updateUserProfileDto.bio !== undefined) {
      updateData.bio = updateUserProfileDto.bio;
    }

    // 위치 업데이트
    if (updateUserProfileDto.location !== undefined) {
      updateData.location = updateUserProfileDto.location;
    }

    // 웹사이트 업데이트
    if (updateUserProfileDto.websiteUrl !== undefined) {
      updateData.websiteUrl = updateUserProfileDto.websiteUrl;
    }

    // 이미지 처리
    if (images.profileImage) {
      try {
        // 기존 이미지가 있다면 삭제 (추후 삭제 기능 추가 시 사용)
        // if (user.userProfile?.profileImageUrl) {
        //   await this.uploadService.deleteFileByCloudinary(
        //     user.userProfile.profileImageUrl,
        //   );
        // }

        // 새 이미지 업로드
        const updatedImage =
          await this.uploadService.uploadFileByCloudinaryForUserProfile({
            file: images.profileImage[0],
            userId,
            type: ImageType.profileImage,
          });
        updateData.profileImageUrl = updatedImage.url;
      } catch (error) {
        throw new Error('이미지 처리 중 오류가 발생했습니다.');
      }
    }

    if (images.coverImage) {
      try {
        // 기존 이미지가 있다면 삭제 (추후 삭제 기능 추가 시 사용)
        // if (user.userProfile?.coverImageUrl) {
        //   await this.uploadService.deleteFileByCloudinary(
        //     user.userProfile.coverImageUrl,
        //   );
        // }

        // 새 이미지 업로드
        const updatedImage =
          await this.uploadService.uploadFileByCloudinaryForUserProfile({
            file: images.coverImage[0],
            userId,
            type: ImageType.coverImage,
          });
        updateData.coverImageUrl = updatedImage.url;
      } catch (error) {
        throw new Error('이미지 처리 중 오류가 발생했습니다.');
      }
    }

    try {
      // 프로필 업데이트
      const updatedProfile = await this.prismaService.userProfile.update({
        where: { id: user.id },
        data: updateData,
      });

      return {
        id: updatedProfile.id,
        nickname: updatedProfile.nickname,
        bio: updatedProfile.bio,
        profileImageUrl: updatedProfile.profileImageUrl,
        coverImageUrl: updatedProfile.coverImageUrl,
        location: updatedProfile.location,
        websiteUrl: updatedProfile.websiteUrl,
        createdAt: updatedProfile.createdAt,
      };
    } catch (error) {
      throw new Error('프로필 업데이트 중 오류가 발생했습니다.');
    }
  }
}
