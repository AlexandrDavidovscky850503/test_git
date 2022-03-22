import { Module } from '@nestjs/common';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrdersModule {}

// import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
// import { UserController } from './user.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { OrderEntity } from './order.entity';
// import { UserService } from './user.service';
// import { AuthMiddleware } from './auth.middleware';

// @Module({
//   imports: [TypeOrmModule.forFeature([OrderEntity])],
//   providers: [OrderService],
//   controllers: [
//     OrderController
//   ],
//   exports: [OrderService]
// })
// export class UserModule implements NestModule {
//   public configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware)
//       .forRoutes(
//         {path: 'user', method: RequestMethod.GET},
//         {path: 'users', method: RequestMethod.POST},
//         {path: 'users/login', method: RequestMethod.POST},
//         {path: 'users/:slug', method: RequestMethod.DELETE},
//         {path: 'user', method: RequestMethod.PUT});
//   }
// }
