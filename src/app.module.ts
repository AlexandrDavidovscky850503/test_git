// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ArticleModule } from './vinyl/vinyl.module';
import { UserModule } from './user/user.module';
import { OrdersModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
// import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { configurationFactory } from './config';
// import { configurationFactory } from './config';
// import { AppService } from './app.service';
//import { configurationFactory } from './config/configuration';
//import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

// import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../../.env',
      isGlobal: true,
      load: [configurationFactory],
    }),

    TypeOrmModule.forRoot(),
    ArticleModule,
    UserModule,
    OrdersModule,

    // ConfigModule.forRoot({
    //   validationSchema: Joi.object({
    //     STRIPE_SECRET_KEY: Joi.string(),
    //     STRIPE_CURRENCY: Joi.string(),
    //     FRONTEND_URL: Joi.string(),
    //     // ...
    //   })
    // }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
