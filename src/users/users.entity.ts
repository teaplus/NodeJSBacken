/* eslint-disable prettier/prettier */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({unique: true})
  email: string;

  @Column()
  name: string;
  
  @Column({unique: true}) 
  username: string;

  @Column()
  password: string;

  
  
}