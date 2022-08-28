/* eslint-disable prettier/prettier */

import { BillDetail } from 'src/bill_detail/bill_detail.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  image: string;

  @Column()
  type: string;

  @Column()
  price: number;

  @Column()
  decription: string;

  @OneToMany(() => BillDetail, (billDetail) => billDetail.product)
  billDetail: BillDetail[];
}
