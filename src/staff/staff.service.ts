import {
  Injectable,
  HttpException,
  BadGatewayException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from 'src/bill/bill.entity';
import { Repository, Connection } from 'typeorm';
import { Staff } from './Staff.entity';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private readonly Staff: Repository<Staff>,
    private connection: Connection,
  ) {}

  async findEmail(email: string): Promise<Staff | undefined> {
    return this.Staff.findOne({
      where: {
        email: email,
      },
    });
  }

  async findNumber(number: string): Promise<Staff | undefined> {
    return this.Staff.findOne({ where: { phoneNumber: number } });
  }

  async findAll(id: number): Promise<Staff | undefined> {
    return this.Staff.findOne({ id: id });
  }

  async createStaff(Staff: Staff) {
    const existEmail = await this.findEmail(Staff.email);
    const existNumber = await this.findNumber(Staff.phoneNumber);
    if (existEmail || existNumber) {
      throw new HttpException('Email or phone Number has exist', 403);
    } else {
      return await this.Staff.save(Staff);
    }
  }

  async updateStaff(staff: Staff, id: number) {
    const user = this.Staff.findOne({
      where: {
        id: id,
      },
    });
    try {
      if (user) {
        await this.Staff.update(id, staff);
        return this.Staff.findOne(id);
      }
      return new HttpException('user not exist', 404);
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'bad request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteManyStaff(id: number[]) {
    try {
      for (let i = 0; i < id.length; i++) {
        await this.Staff.delete(id[i]);
      }
      return this.Staff.find();
    } catch (e) {
      throw new BadGatewayException(e);
    }
  }

  async deleteStaff(id: number) {
    const existId = await this.findAll(id);
    console.log(existId);
    try {
      if (existId) {
        await this.Staff.delete(id);
        return 'delete Success';
      }
      throw new HttpException('user not found', 404);
    } catch (e) {
      throw new HttpException('not found', 404);
    }
  }

  async getListStaff() {
    try {
      const count = await this.Staff.count();
      const data = await this.Staff.find();
      return { data, count };
    } catch (e) {
      throw { e };
    }
  }

  async getStaff(id: number) {
    const staff = await this.Staff.findOne(id);
    const BillList = await this.connection.manager.find(Bill, {
      where: {
        staff: id,
      },
    });
    const billBerStaff = await this.connection.manager.count(Bill, {
      where: {
        staff: id,
      },
    });
    try {
      return { staff, billBerStaff, BillList };
    } catch (e) {
      throw new HttpException('notfound', 404);
    }
  }

  async getBill(id: number) {
    try {
      return await this.connection.manager.find(Bill, {
        where: {
          staff: id,
        },
      });
    } catch (e) {
      throw new BadGatewayException(e);
    }
  }
}
