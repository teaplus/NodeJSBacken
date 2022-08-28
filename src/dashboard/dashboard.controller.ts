/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashBoardService: DashboardService) {}

  @Get()
  getListDashBoard() {
    return this.dashBoardService.getListCardDashBoard();
  }
}
