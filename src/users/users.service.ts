/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Staff } from 'src/Staff/Staff.entity';
import { Repository, Connection } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
    private connection: Connection,
  ) {}

  
  async findOne(username: string): Promise<User | undefined> {
    return this.user.findOne({ username: username });
  }

  async create(
    email: string,
    username: string,
    password: string,
    staffId: number
  ): Promise<User> {
    const staff = await this.connection.manager.findOne(Staff, staffId)
    console.log({staff});
    
    const newUser = new User();
    newUser.email = email;
    newUser.username = username;
    newUser.password = password;
    newUser.staff = staff
    return await this.user.save(newUser);
  }

  async findUser(id: number): Promise<User | undefined> {
    return this.user.findOne(id,
      {
        relations: ["staff"]
      }
      );
  }

  async findEmail(email: string): Promise<User | undefined> {
    return this.user.findOne({ email: email });
  }

  async findAll(): Promise<User[]> {
    return await this.user.find();
  }

  async createMany(users: User) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      console.log(users);
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