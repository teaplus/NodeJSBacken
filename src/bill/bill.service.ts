import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Connection, Repository } from 'typeorm';
import { Bill } from './bill.entity';
import { CreateBillDto } from './dto/create-bill.dto';
import { BillDetail } from 'src/bill_detail/bill_detail.entity';
import { Product } from 'src/product/product.entity';

@Injectable()
export class BillService {
  constructor(
    @InjectRepository(Bill)
    private readonly Bill: Repository<Bill>,
    private connection: Connection,
  ) {}

  async getListBillPerStaff(req) {
    const skip = parseInt(req.range0);
    const take = parseInt(req.range1);
    try {
      const data = await this.Bill.find({
        where: { staff: req.id },
        skip: skip,
        take: take + 1 - skip,
      });

      const pageNumber = await this.Bill.count({
        where: { staff: req.id },
      });

      const numberOfPage = (pageNumber - (pageNumber % 5)) / 5 + 1;
      return { data, numberOfPage };
    } catch (e) {
      return e;
    }
  }

  async getListBill(req) {
    const skip = parseInt(req.range0);
    const take = parseInt(req.range1);
    try {
      const data = await this.Bill.find({
        relations: ['billDetail', 'billDetail.product', 'staff'],
        skip: skip,
        take: take + 1 - skip,
      });
      const count = await this.Bill.count();
      return { data, count };
    } catch (e) {
      return e;
    }
  }

  async deleteManyBill(id: number[]) {
    try {
      for (let i = 0; i < id.length; i++) {
        await this.Bill.delete(id[i]);
      }
      return this.Bill.find();
    } catch (e) {
      throw new HttpException('bad request', 500);
    }
  }

  async deleteBill(id: number) {
    const isBill = this.Bill.findOne({ where: { id: id } });
    try {
      if (isBill) {
        return await this.Bill.delete(id);
      }
      throw new HttpException('Bill has not exist', 404);
    } catch (e) {
      throw new HttpException('bad request', 500);
    }
  }

  async billDetail(id: number) {
    const data = await this.connection.manager.findAndCount(BillDetail, {
      where: {
        bill: id,
      },
      relations: ['product'],
    });

    try {
      const staff = await this.Bill.findOne(id, {
        relations: ['staff'],
      });
      return { data, id, staff };
    } catch (e) {
      throw { e };
    }
  }

  async createBill(dto: CreateBillDto) {
    try {
      const { identifiers } = await this.Bill.insert({
        staff: { id: dto.staffId },
        price: dto.price,
      });
      const billId = identifiers[0].id;

      for await (const d of dto.billDetail) {
        await this.connection.manager.insert(BillDetail, {
          bill: { id: billId },
          product: { id: d.product.id },
          amount: d.amount,
        });
      }
      return this.Bill.findOne(billId, {
        relations: ['billDetail'],
      });
    } catch (e) {
      throw e;
    }
  }

  getCash = (props) => {
    const { ListProduct, id } = props;

    return ListProduct?.map((item) => {
      let count = 0;
      const itemCount = id.reduce((prev, next) => {
        if (parseInt(next) === item.id) {
          count++;
        }

        return prev;
      }, 0);
      return { product: item, amount: count };
    });
  };

  async getListProduct(id: number[]) {
    const ListProduct = await this.connection.manager.findByIds(Product, id);
    const data = this.getCash({ ListProduct, id });
    return { data };
  }

  //=====================================Get Bill Per Date=============================================

  getBetween(date) {
    let getDate;
    let toDate;
    switch (date.rule) {
      case '1': {
        getDate = new Date(new Date(date?.date).setHours(0, 0, 0));
        toDate = new Date(new Date(date?.date).setHours(23, 59, 59));
        break;
      }
      case '2': {
        getDate = new Date(new Date(date?.date).setDate(1));
        toDate = new Date(new Date(date?.date).setDate(32));
        break;
      }
    }

    return { getDate, toDate };
  }

  getPrice = (props) =>
    props?.reduce((acc, curr) => {
      acc += curr.price;
      return acc;
    }, 0);

  async getListBillPerDate(date) {
    const time = this.getBetween(date);
    const skip = parseInt(date.range0);
    const take = parseInt(date.range1);

    const listBill = await this.Bill.find({
      where: {
        createdAt: Between(time.getDate, time.toDate),
      },
      skip: skip,
      take: take + 1 - skip,
    });
    const countBill = await this.Bill.count({
      where: {
        createdAt: Between(time.getDate, time.toDate),
      },
    });
    const allBillPerTime = await this.Bill.find({
      where: {
        createdAt: Between(time.getDate, time.toDate),
      },
    });
    const total = this.getPrice(allBillPerTime);
    const page = Math.ceil(countBill / 5);
    return { listBill, total, page };
  }

  async GetListBillWithDate(date) {
    const data = await this.getListBillPerDate(date);

    return { data };
  }
}
