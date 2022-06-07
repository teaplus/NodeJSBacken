/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository, Connection } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private readonly user: Repository<Users>,
    private connection: Connection,
  ) {}

  
  async findOne(username: string): Promise<Users | undefined> {
    return this.user.findOne({ username: username });
  }

  async create(
    email: string,
    username: string,
    password: string,
  ): Promise<Users> {
    const user = new Users();
    user.email = email;
    user.username = username;
    user.password = password;
    return await this.user.save(user);
  }

  async findUser(id: number): Promise<Users | undefined> {
    return this.user.findOne({ id: id });
  }
  async findEmail(email: string): Promise<Users | undefined> {
    return this.user.findOne({ email: email });
  }

  async findAll(): Promise<Users[]> {
    return await this.user.find();
  }

  async createMany(users: Users) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      console.log(users);
      await queryRunner.manager.save(Users, users);
      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made

      await queryRunner.rollbackTransaction();
      return 'error';
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async changePassword(id: number, password: string, confirm:string): Promise<any> {
    // await this.user.update()
    // await this.user.update(id, password)
    const passwordconfirm = await this.findUser(id)
      if(confirm === passwordconfirm.password){
        await this.user.createQueryBuilder()
        .update()
        .set({
          password: password
        })
        .where({id: id})
        .execute()

        return 'successfull'
      }
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'password incorrect',
        },
        HttpStatus.FORBIDDEN,
      );    
}
}