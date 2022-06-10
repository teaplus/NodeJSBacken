/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { error } from 'console';
import { Repository, Connection } from 'typeorm';
import { Staff } from './Staff.entity';

@Injectable()
export class StaffService {
    
    constructor(
        @InjectRepository(Staff)
        private readonly Staff: Repository<Staff>,
        private connection: Connection,
      ) {}
    
      async findEmail(email: string): Promise<Staff | undefined> {
        return this.Staff.findOne({ email: email });
      }

      async findNumber(number: string): Promise<Staff | undefined> {
        console.log('number', number);
        
        return this.Staff.findOne({ Pnumber: number });
      }

      async findAll(id: number): Promise<Staff | undefined>{
          console.log('staff', id);
          
          return this.Staff.findOne({id: id})
      }
      
      async createStaff(Staff: Staff){      
        const existEmail = await this.findEmail(Staff.email)
        const existNumber = await this.findNumber(Staff.Pnumber)
        // console.log(existNumber)
          if(existEmail||existNumber){
            throw new HttpException(
                {
                  status: HttpStatus.FORBIDDEN,
                  error: 'Email/sdt đã tồn tại',
                },
                HttpStatus.FORBIDDEN,
              );
          }
          else{
          console.log(Staff)
            return await this.Staff.save(Staff)
          }
        }

        async updateStaff(Staff: Staff, id: string ){
            try{
                await this.Staff.update(Staff.id, Staff)
            }
            catch(e){
                return 'error'
            }
        }

        async deleteStaff(id: number){
            const existId = await this.findAll(id)
            console.log(existId);
            
            try{
                if(existId){
                   return await this.Staff.delete(id)
                }
                else{
                  return 'id not exist'

                }
            }
            catch(e){
              return e
            }
        }

        async getListStaff(){
          try{
            return await this.Staff.find()
          }
          catch{}
        }

        async staffDetail(id: number){
          try{
            return await this.Staff.findOne(id)
          }
          catch(e){
            throw new HttpException(
              {
                status: HttpStatus.FORBIDDEN,
                error: "Nhan vien khong ton tai"
              },
              HttpStatus.FORBIDDEN
            )
          }
        }
}
