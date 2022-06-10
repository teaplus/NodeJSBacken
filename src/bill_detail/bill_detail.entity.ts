/* eslint-disable prettier/prettier */
import { Bill } from "src/bill/bill.entity";
import { Product } from "src/product/product.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BillDetail {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=>Bill, (bill)=> bill.billDetail)
    bill: Bill

    @ManyToOne(()=>Product, (product)=>product.billDetail)
    product: Product

    @Column()
    amount: number;
}
