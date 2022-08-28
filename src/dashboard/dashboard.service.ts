/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bill } from 'src/bill/bill.entity';
import { Staff } from 'src/Staff/Staff.entity';
import { Connection, Index, Repository } from 'typeorm';
import { format, subDays, addDays } from 'date-fns';

@Injectable()
export class DashboardService {
  constructor(private connection: Connection) {}

  getIncome = (props) => {
    const array = [
      'totalAll',
      'totalYear',
      'totalMonthly',
      'totalDay',
      'totalQuarter',
    ];
    const income = props?.reduce(
      (prev, curr) => {
        if (new Date(curr.createdAt).getMonth() === new Date().getMonth()) {
          prev.totalMonthly += curr.price;
        }

        if (
          new Date(curr.createdAt).getMonth() === new Date().getMonth() &&
          new Date(curr.createdAt).getDate() === new Date().getDate()
        ) {
          prev.totalDay += curr.price;
        }
        if (
          new Date(curr.createdAt).getFullYear() === new Date().getFullYear()
        ) {
          prev.totalYear += curr.price;
        }

        prev.totalAll += curr.price;

        if (
          Math.floor(new Date(curr.createdAt).getMonth() / 3) ===
          Math.floor(new Date().getMonth() / 3)
        ) {
          prev.totalQuarter += curr.price;
        }
        return prev;
      },
      {
        totalAll: 0,
        totalYear: 0,
        totalMonthly: 0,
        totalDay: 0,
        totalQuarter: 0,
      },
      {} as { [key: string]: number },
    );

    return array.map((data) => ({
      id: array.indexOf(data),
      name: data,
      price: income[data],
    }));
  };

  getPrice = (Props): { [key: string]: number } =>
    Props.reduce((prevStaff, curr) => {
      const staffId = curr.staff.id;
      if (!prevStaff[staffId]) {
        prevStaff[staffId] = 0;
      }
      prevStaff[staffId] += curr.price;
      return prevStaff;
    }, {} as { [key: string]: number });

  async getPricePerStaff(data) {
    const listStaff = await this.connection.manager.find(Staff);
    const listPrice = this.getPrice(data);
    return listStaff?.map((data) => ({
      id: data.id,
      name: data.name,
      price: listPrice[data.id] || 0,
    }));
  }

  dateFormatter = (date: number): string => new Date(date).toLocaleDateString();

  aggregateOrdersByDay = (orders) =>
    orders.reduce((acc, curr) => {
      const day = format(new Date(curr.createdAt), 'yyyy-MM-dd');
      if (!acc[day]) {
        acc[day] = 0;
      }
      acc[day] += curr.price;
      return acc;
    });

  getRevenuePerDay = (orders) => {
    const lastDay = new Date();
    const lastMonthDays = Array.from({ length: 30 }, (_, i) =>
      subDays(lastDay, i),
    );
    const daysWithRevenue = this.aggregateOrdersByDay(orders);
    return lastMonthDays.map((date) => ({
      id: lastMonthDays.indexOf(date),
      date: date.getTime(),
      total: daysWithRevenue[format(new Date(date), 'yyyy-MM-dd')] || 0,
    }));
  };

  async getListCardDashBoard() {
    const listBill = await this.connection.manager.find(Bill, {
      relations: ['staff'],
    });
    try {
      const chart = this.getRevenuePerDay(listBill);
      const data = this.getIncome(listBill);
      const count = await this.connection.manager.count(Bill);
      const pricePerStaff = await this.getPricePerStaff(listBill);
      return { data, pricePerStaff, chart, count };
    } catch (e) {}
  }
}
