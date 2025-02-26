import { IsEmail, IsNumber, IsString } from 'class-validator';
import { DateDto } from 'src/dtos/common.dto';

export class CreateUserDto extends DateDto {
  @IsNumber()
  id: number;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
