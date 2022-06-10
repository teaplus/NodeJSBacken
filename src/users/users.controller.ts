/* eslint-disable prettier/prettier */
import { Controller, Request, Post, UseGuards, Body, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserService } from './users.service';
import { User } from './users.entity';
import { Staff } from 'src/Staff/Staff.entity';



@Controller('users')
export class UsersController {
    constructor(private readonly UserService: UserService){}
  
  
  @Post('register')
  create(@Body() user: User) {
  return this.UserService.create(user.email, user.username, user.password, user.staff.id);
  }

  @Post('change')
  changePassword(@Body() body ){
    return this.UserService.changePassword(body.id, body.password, body.confirm)
  }

  @Get(':id')
  async userConversation(@Param() params): Promise<User>{
    return await this.UserService.findUser(params.id);
    
  }
  
}
