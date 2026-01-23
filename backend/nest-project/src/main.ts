import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const allowedOrigins = ['http://localhost:4200', 'http://localhost:4201'];
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: allowedOrigins,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type, Authorization',
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use('/storage', express.static(join(__dirname, '..', 'storage')));

  await app.listen(3000);
  console.log('Listening on http://localhost:3000');
}
bootstrap();
