import { Body, Query, ValidationPipe } from '@nestjs/common';

export const ValidBody = (...args) =>
  Body(
    ...args,
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

export const ValidQuery = (...args) =>
  Query(
    ...args,
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
