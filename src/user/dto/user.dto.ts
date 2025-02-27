import {
  IsEmail,
  IsEnum,
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
  refreshToken?: string;
}

export enum UserFindCondition {
  USERNAME = 'username',
  EMAIL = 'email',
}
export class UserFindOneDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
