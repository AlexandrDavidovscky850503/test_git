import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      { path: 'users', method: RequestMethod.GET }, // get user profile
      // {path: 'users/buy', method: RequestMethod.GET}, //
      { path: 'user/orderlist', method: RequestMethod.GET }, // get orders

      // {path: 'users', method: RequestMethod.POST}, // create user
      // {path: 'users/login', method: RequestMethod.POST},
      // // {path: 'users/:slug', method: RequestMethod.DELETE},
      { path: 'user', method: RequestMethod.PUT }, //update user
    );
  }
}
