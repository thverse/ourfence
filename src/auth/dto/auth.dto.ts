import { IsString } from 'class-validator';
import { UserCreateDto, UserFindOneDto } from 'src/user/dto/user.dto';

export class SignUpDto extends UserCreateDto {}

export class SignInDto extends UserFindOneDto {}
