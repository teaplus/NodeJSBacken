/* eslint-disable prettier/prettier */
import { Controller, Request, Post, UseGuards, Body, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Staff } from './Staff.entity';
import { StaffService } from './Staff.service';



@Controller('Staff')
export class StaffController {
    constructor(private readonly StaffService: StaffService){}

    @Get()
    getListStaff(){
      return this.StaffService.getListStaff()
    
    }

    @Post('create')
  create(@Body() Staff: Staff) {
  return this.StaffService.createStaff(Staff);
    }

    @Post('edit')
  edit(@Body() Staff: Staff, id) {
  return this.StaffService.updateStaff(Staff, id);
    }

    @Post('delete')
        delete(@Body() id: number){
            return this.StaffService.deleteStaff(id)
        }
}
