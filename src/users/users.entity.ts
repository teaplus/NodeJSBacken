/* eslint-disable prettier/prettier */

import { Staff } from 'src/Staff/Staff.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({unique: true})
  email: string;

  @Column({unique: true}) 
  username: string;

  @Column()
  password: string;

  @OneToOne(()=> Staff)
  @JoinColumn()
  staff: Staff


  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;
  
}