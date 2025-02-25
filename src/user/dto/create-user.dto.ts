import { IsNumber, IsString } from 'class-validator';
import { DateDto } from 'src/dtos/common.dto';

export class CreateUserDto extends DateDto {
  @IsNumber()
  id: number;
  @IsString()
  username: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
}
