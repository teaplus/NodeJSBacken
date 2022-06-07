/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import {
  Controller,
  ParseIntPipe,
  Request,
  Post,
  UseGuards,
  Get,
  Render,
  Redirect,
  Response,
  HttpStatus,
  UnauthorizedException,
  HttpException,
  Next,
  UseInterceptors,
  Param,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RedirectError } from './logger/redirecError.middleware';
import * as express from 'express';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Response({ passthrough: true }) res) {
    let a = this.authService.login(req.user);
    let today = new Date().toLocaleTimeString();
    let jwt = (await a).access_token;
    res.cookie('jwt', jwt, { httpOnly: true });
    res.cookie('time', today, { httpOnly: true });
    return 'loginn success'
  }

  @Get('profile')
  async user(@Request() req) {
    const cookie = await req.cookies['jwt'];
    const time = req.cookies['time'];
    const data = await this.authService.check(cookie);
    try {
      if (cookie === 'undefined') {
        return UnauthorizedException;
      }
      return { user: data, time: req.cookies['time'] };
    } catch (e) {
      console.log('err');
    }
  }

  @Post('logout')
  async logout(@Response({ passthrough: true }) res) {
    res.clearCookie('jwt');
    return 'logout'
  }



}
