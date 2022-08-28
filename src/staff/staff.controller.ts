/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
  Response,
  Header,
  Delete,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { Staff } from './Staff.entity';
import { StaffService } from './Staff.service';

@Controller('staff')
export class StaffController {
  constructor(private readonly StaffService: StaffService) {}
  @Get()
  getListStaff(@Request() req) {
    return this.StaffService.getListStaff();
  }

  @Post()
  createStaff(@Body() Staff: Staff) {
    return this.StaffService.createStaff(Staff);
  }

  @Delete()
  delete(@Body() body) {
    return this.StaffService.deleteManyStaff(body.id);
  }

  @Delete(':id')
  deleteMany(@Param() params) {
    return this.StaffService.deleteStaff(params.id);
  }

  @Get(':id')
  GetEdit(@Param() params) {
    return this.StaffService.getStaff(params.id);
  }

  @Put(':id')
  PutEdit(@Body() body) {
    return this.StaffService.updateStaff(body, body.id);
  }
}
