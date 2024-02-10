import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //stripping out elements that are not defined in class format in input json
    }),
  );
  app.enableCors({
    origin: '*', // allow all origins
    // 'http://localhost:3000',
    // 'https://jh-jobhub.vercel.app',
    // 'https://jobhub-admin.vercel.app',
    credentials: true,
  });
  // enable cookie parser

  app.setGlobalPrefix('api');
  await app.listen(8000);
}
bootstrap();
