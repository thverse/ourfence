import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { UserCreateDto, UserFindOneDto } from 'src/user/dto/user.dto';

export class SignUpDto extends UserCreateDto {}

export class SignInDto {
  @IsString()
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
export class SignOutDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class GoogleAccountCreateDto {
  @IsNumber()
  userId: number;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  image: string;
}
