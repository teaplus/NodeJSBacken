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

  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Response({ passthrough: true }) res) {
    const User = req.body;
    return this.authService.login(User.username, User.password);
  }

  @Post('logout')
  async logout(@Response({ passthrough: true }) res) {
    res.clearCookie('jwt');
    return 'logout';
  }
}
