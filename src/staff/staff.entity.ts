/* eslint-disable prettier/prettier */

import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Bill } from 'src/bill/bill.entity';
import { User } from 'src/users/users.entity';
import { userInfo } from 'os';
@Entity()
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({unique: true})
  email: string;

  @Column()
  name: string;
  
  @Column() 
  birth: Date;

  @Column({unique: true})
  Pnumber: string;

  @OneToMany(()=>Bill, (bill)=> bill.staff)
  bill : Bill[]

}