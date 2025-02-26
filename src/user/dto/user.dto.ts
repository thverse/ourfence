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

export enum UserFindCondition {
  ID = 'id',
  USERNAME = 'username',
  EMAIL = 'email',
}
export class UserFindOneDto {
  @IsEnum(UserFindCondition)
  type: string;

  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
