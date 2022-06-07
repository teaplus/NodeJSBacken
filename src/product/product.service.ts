/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, HttpStatus, HttpException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly Product: Repository<Product>,
        private connection: Connection,
      ) {}

      async getList(){
        return await this.Product.find()
      }

      async createProduct(Product: Product){
        try{
          return await this.Product.save(Product)
        }
        catch(e){
          return UnauthorizedException
        }
      }

      async updateProduct(Product: Product){
        try{
         return await this.Product.update(Product.id, Product)
        }
        catch(e){}
      }

      
      async deleteProduct(id: number){
        try{
          return await this.Product.delete(id)
        }
        catch(e){
        }
      }

      async productDetail(id: number){
        try{
          return await this.Product.findOne(id)
        }
        catch(e){
          
        }
      }

}

