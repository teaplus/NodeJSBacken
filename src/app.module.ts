/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/users.entity';
import { StaffModule } from './Staff/Staff.module';
import { Staff } from './Staff/Staff.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';
import { BillModule } from './bill/bill.module';
import { Bill } from './bill/bill.entity';
import { BillDetailModule } from './bill_detail/bill_detail.module';
import { BillDetail } from './bill_detail/bill_detail.entity';

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
      entities: [User, Staff, Bill, Product, BillDetail],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    StaffModule,
    Product,
    // ProductModule,
    BillModule,
    BillDetailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
