import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductSizeService } from './product-size.service';
import { CreateProductSizeDto } from './dto/create-product-size.dto';
import { UpdateProductSizeDto } from './dto/update-product-size.dto';

@Controller('product-size')
export class ProductSizeController {
  constructor(private readonly productSizeService: ProductSizeService) {}

  @Post()
  create(@Body() createProductSizeDto: CreateProductSizeDto) {
    return this.productSizeService.create(createProductSizeDto);
  }

  @Post('asignar-precio')
  async asignarPrecio(
    @Body() body: { productId: number; sizeId: number; price: number },
  ) {
    return await this.productSizeService.asignarPrecio(
      body.productId,
      body.sizeId,
      body.price,
    );
  }

  @Get()
  findAll() {
    return this.productSizeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productSizeService.findOne(+id);
  }

  @Get(':productId/:sizeId')
  async obtenerProductoTalla(
    @Param('productId') productId: string,
    @Param('sizeId') sizeId: string,
  ) {
    return await this.productSizeService.obtenerProductoTalla(
      +productId,
      +sizeId,
    );
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductSizeDto: UpdateProductSizeDto,
  ) {
    return this.productSizeService.update(+id, updateProductSizeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productSizeService.remove(+id);
  }
}
