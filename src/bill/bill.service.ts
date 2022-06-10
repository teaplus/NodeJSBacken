/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/Staff/Staff.entity';
import { Connection, Repository, getConnection } from 'typeorm';
import { Bill } from './bill.entity';

@Injectable()
export class BillService {
    constructor(
        @InjectRepository(Bill)
        private readonly Bill: Repository<Bill>,
        private connection: Connection,

    ){}

    async findBill(){
        
    }

    async createBill(bill: Bill){
        // const staff = await this.connection.manager.findOne(Staff, bill.staff)
        // const Bill = await this.Bill.find({
        //     relations:{
        //         staff: true,
        //     },
        // })
        console.log(bill)

        try {
            return await this.Bill.save(bill);
        } catch (e) {
            return e

        }

    }
}
