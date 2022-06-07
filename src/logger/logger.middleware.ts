/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const a = req.body
    if(a.username == 'admin'){
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Username khong hợp lệ',
      }, HttpStatus.FORBIDDEN);
    }    
    console.log('Authentication...');
    next();
  }
}

export class RegisterMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const a = req.body
    console.log(a)
    if(a.username == 'admin'|| a.password <=3 ){
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Username/password khong hợp lệ, username khong được dùng admin, password không được ít hơn 4 ký tự',
      }, HttpStatus.FORBIDDEN);
    }    
    console.log('register successful');
    next();
  }
}