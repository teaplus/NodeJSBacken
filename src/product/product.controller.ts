/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly ProductService: ProductService) {}

  @Get()
  getListProduct(@Request() req) {
    const array = req.query;
    return this.ProductService.getList(array);
  }

  @Post()
  create(@Body() Product: Product) {
    return this.ProductService.createProduct(Product);
  }

  @Put(':id')
  update(@Body() Product: Product) {
    return this.ProductService.updateProduct(Product);
  }
  @Delete()
  deleteMany(@Body() body) {
    return this.ProductService.deleteManyProduct(body.id);
  }

  @Delete(':id')
  delete(@Param() params) {
    return this.ProductService.deleteProduct(params);
  }

  @Get(':id')
  detail(@Param() params) {
    return this.ProductService.productDetail(params);
  }
}
