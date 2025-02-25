import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [CatsModule, UserModule],
  controllers: [AppController, CatsController, UserController],
  providers: [AppService, CatsService, UserService],
})
export class AppModule {}
