import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSize } from './entities/product-size.entity';
import { Product } from '../products/entities/product.entity';
import { Size } from '../sizes/entities/size.entity';
import { CreateProductSizeDto } from './dto/create-product-size.dto';
import { UpdateProductSizeDto } from './dto/update-product-size.dto';

@Injectable()
export class ProductSizeService {
  constructor(
    @InjectRepository(ProductSize)
    private productSizeRepository: Repository<ProductSize>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Size)
    private sizesRepository: Repository<Size>,
  ) {}

  async create(createProductSizeDto: CreateProductSizeDto): Promise<ProductSize> {
    const { productId, sizeId, price } = createProductSizeDto;
    return this.asignarPrecio(productId, sizeId, price);
  }

  async asignarPrecio(
    productId: number,
    sizeId: number,
    price: number,
  ): Promise<ProductSize> {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    const size = await this.sizesRepository.findOne({
      where: { id: sizeId },
    });
    if (!size) {
      throw new NotFoundException(`Size with ID ${sizeId} not found`);
    }

    const productSize = this.productSizeRepository.create({
      product,
      size,
      price,
    });

    return await this.productSizeRepository.save(productSize);
  }

  async findAll(): Promise<ProductSize[]> {
    return this.productSizeRepository.find({
      relations: ['product', 'size'],
    });
  }

  async findOne(id: number): Promise<ProductSize> {
    const productSize = await this.productSizeRepository.findOne({
      where: { id },
      relations: ['product', 'size'],
    });
    if (!productSize) {
      throw new NotFoundException(`ProductSize with ID ${id} not found`);
    }
    return productSize;
  }

  async obtenerProductoTalla(
    productId: number,
    sizeId: number,
  ): Promise<ProductSize | null> {
    const productSize = await this.productSizeRepository.findOne({
      where: { product: { id: productId }, size: { id: sizeId } },
      relations: ['product', 'size'],
    });
    return productSize;
  }

  async update(
    id: number,
    updateProductSizeDto: UpdateProductSizeDto,
  ): Promise<ProductSize> {
    const productSize = await this.findOne(id);

    if (updateProductSizeDto.productId) {
      const product = await this.productsRepository.findOne({
        where: { id: updateProductSizeDto.productId },
      });
      if (!product) {
        throw new NotFoundException(
          `Product with ID ${updateProductSizeDto.productId} not found`,
        );
      }
      productSize.product = product;
    }

    if (updateProductSizeDto.sizeId) {
      const size = await this.sizesRepository.findOne({
        where: { id: updateProductSizeDto.sizeId },
      });
      if (!size) {
        throw new NotFoundException(
          `Size with ID ${updateProductSizeDto.sizeId} not found`,
        );
      }
      productSize.size = size;
    }

    if (updateProductSizeDto.price !== undefined) {
      productSize.price = updateProductSizeDto.price;
    }

    return this.productSizeRepository.save(productSize);
  }

  async remove(id: number): Promise<void> {
    const productSize = await this.findOne(id);
    await this.productSizeRepository.remove(productSize);
  }
}
