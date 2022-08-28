/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  BadGatewayException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Staff } from 'src/Staff/Staff.entity';
import { Repository, Connection } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    private connection: Connection,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.user.findOne(
      { username: username },
      {
        relations: ['staff'],
      },
    );

    return user;
  }

  async create(
    username: string,
    password: string,
    staffId: number,
  ): Promise<User> {
    const staff = await this.connection.manager.findOne(Staff, staffId);
    const newUser = new User();
    newUser.username = username;
    newUser.password = await this.hashPassword(password);
    newUser.staff = staff;
    return await this.user.save(newUser);
  }

  async findUser(id: number): Promise<User | undefined> {
    return this.user.findOne(id, {
      relations: ['staff'],
    });
  }

  async findAll() {
    try {
      const count = await this.user.count();
      const data = await this.user.find({ relations: ['staff'] });
      return { data, count };
    } catch (e) {
      throw { e };
    }
  }

  async createMany(users: User) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(User, users);
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made

      await queryRunner.rollbackTransaction();
      return err;
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async changePassword(id: number, password: string, confirm: string) {
    const passwordconfirm = await this.connection.manager.findOne(User, {
      where: { staff: id },
    });
    const match: boolean = await bcrypt.compare(
      confirm,
      passwordconfirm.password,
    );
    if (match) {
      await this.user
        .createQueryBuilder()
        .update()
        .set({
          password: await this.hashPassword(password),
        })
        .where({ staff: id })
        .execute();
      return new HttpException(
        {
          status: HttpStatus,
          error: 'correct',
        },
        HttpStatus.GONE,
      );
    }
    throw new HttpException(
      {
        status: HttpStatus,
        error: 'password incorrect',
      },
      HttpStatus.FORBIDDEN,
    );
  }

  async deleteManyUser(id: number[]) {
    try {
      for (let i = 0; i < id.length; i++) {
        await this.user.delete(id[i]);
      }
      return this.user.find();
    } catch (e) {
      throw new BadGatewayException(e);
    }
  }

  async deleteUser(id: number) {
    const existId = await this.user.findOne(id);
    console.log(existId);
    try {
      if (existId) {
        await this.user.delete(id);
        return 'delete Success';
      }
      throw new HttpException('user not found', 404);
    } catch (e) {
      throw new HttpException('not found', 404);
    }
  }

  async hashPassword(plain: string): Promise<string> {
    const saltRounds = 10;
    const hashed: string = await bcrypt.hash(plain, saltRounds);
    return hashed;
  }
}
