/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly ProductService: ProductService){}

    @Get()
    getListProduct(@Request() req){
        return this.ProductService.getList()
    }

    @Post('create')
    create(@Body() Product: Product){
        return this.ProductService.createProduct(Product)
    }

    @Post('update')
    update(@Body() Product: Product){
        return this.ProductService.updateProduct(Product)
    }

    @Post('delete/:id')
    delete(@Param() params){
        return this.ProductService.deleteProduct(params)
    }

    @Get(':id')
    detail(@Param() params){
        return this.ProductService.productDetail(params)
    }

}
