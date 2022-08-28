/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Injectable,
  HttpStatus,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
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

  async getList(req) {
    const skip = parseInt(req.range0);
    const take = parseInt(req.range1);

    const data = await this.Product.find({
      skip: skip,
      take: take + 1 - skip,
    });

    return { data };
  }

  async createProduct(Product: Product) {
    try {
      return await this.Product.save(Product);
    } catch (e) {
      return UnauthorizedException;
    }
  }

  async updateProduct(product: Product) {
    try {
      await this.Product.update(product.id, product);
      return this.Product.findOne(product.id);
    } catch (e) {}
  }

  async deleteManyProduct(id: number[]) {
    try {
      for (let i = 0; i < id.length; i++) {
        await this.Product.delete(id[i]);
      }
      return this.Product.find();
    } catch (e) {
      throw new HttpException('bad request', 500);
    }
  }

  async deleteProduct(id: number) {
    const isProduct = this.Product.findOne({ where: { id: id } });
    try {
      if (isProduct) {
        return await this.Product.delete(id);
      }
      throw new HttpException('Product has not exist', 404);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async productDetail(id: number) {
    try {
      const data = await this.Product.findOne(id);
      return { data };
    } catch (e) {
      throw new HttpException('failed', 500);
    }
  }
}
