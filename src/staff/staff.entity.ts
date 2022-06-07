/* eslint-disable prettier/prettier */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
  number: string;

  
  
}