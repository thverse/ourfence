import {
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserCreateDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  nickname: string;

  @IsString()
  password: string;
}
export class UserUpdateDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  refreshToken?: string | null;
}

export enum UserFindCondition {
  USERNAME = 'username',
  EMAIL = 'email',
}
export class UserFindOneDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}

export class ValidateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
export class DuplicateCheckUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;
}

export class UserProfileUpdateDto {
  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: Express.Multer.File[];

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  websiteUrl?: string;
}
