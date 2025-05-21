import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { urlencoded } from 'express';
import { json } from 'express';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api');
  app.use('/assets', express.static(join(__dirname, '..', 'assets')));
  app.enableCors({
    origin: ['http://localhost:3000', 'https://ourfence.xyz'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Set-Cookie'],
  });
  app.use(cookieParser());
  console.log('MODE : ', process.env.MODE);
  await app.listen(process.env.MODE === 'DEV' ? 4000 : 8080);
}
bootstrap();
