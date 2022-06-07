/* eslint-disable prettier/prettier */
import {
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private UserService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<Users> {
    const user = await this.UserService.findOne(username);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Username not exist',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    const err = '';
    if (user && user.password === password) {
      const { password, ...result } = user;
      return user;
    }
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'Password incorrect',
      },
      HttpStatus.FORBIDDEN,
    );
  }

  async sigUp(
    email: string,
    username: string,
    password: string,
  ): Promise<Users> {
    const existEmail = await this.UserService.findEmail(email);
    const existUser = await this.UserService.findOne(username);
    if (existEmail || existUser) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Emailt/Username đã tồn tại',
        },
        HttpStatus.FORBIDDEN,
      );
    } else {
      const user: Users = await this.UserService.create(
        email,
        username,
        password,
      );
      return user;
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findall() {
    const test = await this.UserService.findAll();
  }

  async finduser(id: number) {
    const finduser = await this.UserService.findUser(id);
    return finduser;
  }

  async check(token: any) {
    return this.jwtService.verify(token);
  }
}
