/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import {RedirectFilter} from './logger/redirecError.middleware'



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new RedirectFilter());
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
