import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  // const appOptions = {cors: true};
  // const app = await NestFactory.create(AppModule,appOptions);
  // app.setGlobalPrefix('api');

  // const options = new DocumentBuilder()
  //   .setTitle('NestJS Realworld Example App')
  //   .setDescription('The Realworld API description')
  //   .setVersion('1.0')
  //   .setBasePath('api')
  //   .addBearerAuth()
  //   .build();
  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('/docs', app, document);
  // await app.listen(3000);

  // const appOptions = {cors: true};
  // const app = await NestFactory.create(AppModule, appOptions);
  // const configService = app.get(ConfigService);
  // const globalPrefix = await configService.get('prefix');
  // app.setGlobalPrefix(globalPrefix);
  // const port = configService.get('port');
  // const options = new DocumentBuilder()
  //   .setTitle('Homework Instagram')
  //   .setDescription('Homework Instagram description')
  //   .setVersion('1.0')
  //   .setBasePath('api')
  //   .addBearerAuth()
  //   .build();
  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('/docs', app, document);

  // await app.listen(port, () => {
  //   console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  // });

  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);
  const configService = app.get(ConfigService);

  //   app.enableCors({
  //   origin: configService.get('FRONTEND_URL'),
  //   credentials: true
  // });
  const options = new DocumentBuilder()
    .setTitle('Vinyl Shop')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}
bootstrap();
