/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Users } from './users/users.entity';
import { StaffModule } from './Staff/Staff.module';
import { Staff } from './Staff/Staff.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';

const defaultOptions = {
  type: 'mysql',
  port: 3306,
  username: 'root',
  password: '',
  database: 'users',
  synchronize: true,
};


@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...defaultOptions,
      entities: [Users, Staff, Product],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    StaffModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
