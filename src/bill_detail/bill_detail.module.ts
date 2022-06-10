/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BillDetailService } from './bill_detail.service';
import { BillDetailController } from './bill_detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillDetail } from './bill_detail.entity';

@Module({
  imports:[TypeOrmModule.forFeature([BillDetail])],
  providers: [BillDetailService],
  controllers: [BillDetailController]
})
export class BillDetailModule {}
