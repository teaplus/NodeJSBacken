/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from './bill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bill])],
  providers: [BillService],
  controllers: [BillController],
})
export class BillModule {}
