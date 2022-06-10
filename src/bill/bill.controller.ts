/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { Bill } from './bill.entity';
import { BillService } from './bill.service';

@Controller('bill')
export class BillController {
    constructor(private readonly BillService: BillService){}

    @Post('create')
    createBill(@Body() Bill: Bill){
        return this.BillService.createBill(Bill)
    }
}
