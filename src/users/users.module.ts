/* eslint-disable prettier/prettier */
import { Module, RequestMethod, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { Users } from './users.entity';
import { LoggerMiddleware, RegisterMiddleware } from 'src/logger/logger.middleware';


@Module({

  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UsersController],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'login', method: RequestMethod.POST})
      consumer
      .apply(RegisterMiddleware)
      .forRoutes({ path: 'users/register', method: RequestMethod.POST})
      consumer
      .apply(RegisterMiddleware)
      .forRoutes({ path: 'profile', method: RequestMethod.POST})
    
  }
}