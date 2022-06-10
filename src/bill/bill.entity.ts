/* eslint-disable prettier/prettier */

import { BillDetail } from 'src/bill_detail/bill_detail.entity';
import { Staff } from 'src/Staff/Staff.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: string

  @ManyToOne(()=> Staff, (staff)=> staff.bill)
  staff: Staff

  @OneToMany(()=> BillDetail, (billDetail)=> billDetail.bill)
  billDetail : BillDetail[]



  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;
}