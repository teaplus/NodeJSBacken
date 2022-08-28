/* eslint-disable prettier/prettier */
import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserService } from './users.service';
import { User } from './users.entity';
import { Staff } from 'src/Staff/Staff.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  getListStaff(@Request() req) {

    return this.UserService.findAll();
  }

  @Post()
  create(@Body() user: User) {
    return this.UserService.create(user.username, user.password, user.staff.id);
  }

  @Put(':id')
  changePassword(@Body() body) {
    return this.UserService.changePassword(
      body.id,
      body.password,
      body.confirm,
    );
  }

  @Delete()
  delete(@Body() body) {
    return this.UserService.deleteManyUser(body.id);
  }

  @Delete(':id')
  deleteMany(@Param() params) {
    return this.UserService.deleteUser(params.id);
  }

  @Get(':id')
  async userConversation(@Param() params): Promise<User> {
    return await this.UserService.findUser(params.id);
  }
}
