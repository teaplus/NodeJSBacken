import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';

@Controller('bill')
export class BillController {
  constructor(private readonly BillService: BillService) {}

  @Post()
  createBill(@Body() bill: CreateBillDto) {
    return this.BillService.createBill(bill);
  }

  @Get()
  getListBill(@Request() req) {
    const array = req.query;
    return this.BillService.getListBill(array);
  }

  @Get('staff')
  getlistBillPerStaff(@Query() query) {
    return this.BillService.getListBillPerStaff(query);
  }
  @Get('income')
  getlistIncome(@Request() req) {
    return this.BillService.GetListBillWithDate(req.query);
  }

  @Get('get')
  GetProductById(@Query() query) {
    return this.BillService.getListProduct(query?.id);
  }

  @Get(':id')
  getBill(@Param() params) {
    return this.BillService.billDetail(params);
  }

  @Delete()
  deleteMany(@Body() Body) {
    return this.BillService.deleteManyBill(Body.id);
  }

  @Delete(':id')
  getDetailBill(@Param() params) {
    return this.BillService.deleteBill(params);
  }
}
