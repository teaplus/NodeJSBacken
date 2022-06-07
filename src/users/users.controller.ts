/* eslint-disable prettier/prettier */
import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserService } from './users.service';
import { Users } from './users.entity';



@Controller('users')
export class UsersController {
    constructor(private readonly UserService: UserService){}
  
  
  @Post('register')
  create(@Body() user: Users) {
  return this.UserService.createMany(user);
  }

  @Post('change')
  changePassword(@Body() body ){
    return this.UserService.changePassword(body.id, body.password, body.confirm)
  }

  
}
