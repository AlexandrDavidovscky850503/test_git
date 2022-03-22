import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { VinylController } from './vinyl.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VinylEntity } from './vinyl.entity';
import { Comment } from './comment.entity';
import { UserEntity } from '../user/user.entity';
// import { FollowsEntity } from '../profile/follows.entity';
import { VinylService } from './vinyl.service';
import { AuthMiddleware } from '../user/auth.middleware';
import { UserModule } from '../user/user.module';

import { OrderEntity } from '../order/order.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([VinylEntity, Comment, UserEntity, OrderEntity]),
    UserModule,
  ],
  providers: [VinylService],
  controllers: [VinylController],
})
export class ArticleModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(
      // {path: 'vinyles', method: RequestMethod.GET}, // весь товар получит
      { path: 'vinyles/buy', method: RequestMethod.GET }, // 'Buy one vinyl
      // {path: 'vinyles/sorting', method: RequestMethod.GET}, // 'all srt vinyl
      // {path: 'vinyles/comments', method: RequestMethod.GET}, // 'get vinyl comment

      { path: 'vinyl', method: RequestMethod.POST }, // create vinyl

      { path: 'vinyles', method: RequestMethod.DELETE }, // delete vinil
      { path: 'vinyles', method: RequestMethod.PUT }, // update vinil
      // {path: 'vinyles/:slug', method: RequestMethod.GET}, // Get one vinyl
      { path: 'vinyles/comments', method: RequestMethod.POST }, // create comment
      // {path: 'vinyles/:slug/comments/:id', method: RequestMethod.DELETE},
      // {path: 'vinyles/:slug/favorite', method: RequestMethod.POST},
      // {path: 'vinyles/:slug/favorite', method: RequestMethod.DELETE}
    );
  }
}
