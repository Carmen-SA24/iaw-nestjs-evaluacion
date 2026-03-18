import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSize } from './entities/product-size.entity';
import { Product } from '../products/entities/product.entity';
import { Size } from '../sizes/entities/size.entity';
import { ProductSizeService } from './product-size.service';
import { ProductSizeController } from './product-size.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSize, Product, Size])],
  controllers: [ProductSizeController],
  providers: [ProductSizeService],
  exports: [ProductSizeService],
})
export class ProductSizeModule {}
