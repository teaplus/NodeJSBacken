/* eslint-disable prettier/prettier */
import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.entity';
import { LocalStrategy } from './local.strategy';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private UserService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.UserService.findOne(username);
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Username not exist',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    // const err = '';
    const matches: boolean = await bcrypt.compare(password, user.password);
    if (matches) {
      const { password, ...result } = user;

      return user;
    }
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Password incorrect',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  async createToken(user) {
    // const payload = {username: user.username}
  }

  async signUp(
    username: string,
    password: string,
    staffId: number,
  ): Promise<User> {
    const existUser = await this.UserService.findOne(username);
    if (existUser) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Username đã tồn tại',
        },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const user: User = await this.UserService.create(
        username,
        password,
        staffId,
      );
      return user;
    }
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async login(username: any, password: string) {
    const staff = await this.validate(username, password);
    const payload = {
      username: staff.username,
      name: staff.staff.name,
      staffId: staff.staff.id,
      birth: staff.staff.birth,
    };
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

  async hashPassword(plain: string): Promise<string> {
    const saltRounds = 10;
    const hashed: string = await bcrypt.hash(plain, saltRounds);
    return hashed;
  }
}
