import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductSize } from '../product-size/entities/product-size.entity';
import { Size } from '../sizes/entities/size.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(ProductSize)
    private productSizeRepository: Repository<ProductSize>,
    @InjectRepository(Size)
    private sizesRepository: Repository<Size>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { sizes, ...productData } = createProductDto;

    // Crear el producto
    const product = this.productsRepository.create(productData);
    const savedProduct = await this.productsRepository.save(product);

    // Crear las relaciones ProductSize
    if (sizes && sizes.length > 0) {
      for (const sizeData of sizes) {
        const size = await this.sizesRepository.findOne({
          where: { id: sizeData.sizeId },
        });
        if (!size) {
          throw new NotFoundException(`Size with ID ${sizeData.sizeId} not found`);
        }

        const productSize = this.productSizeRepository.create({
          product: savedProduct,
          size: size,
          price: sizeData.price,
        });
        await this.productSizeRepository.save(productSize);
      }
    }

    return this.findOne(savedProduct.id);
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['productSizes', 'productSizes.size'],
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['productSizes', 'productSizes.size'],
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    
    const { sizes, ...productData } = updateProductDto;
    
    // Actualizar datos básicos del producto
    Object.assign(product, productData);
    await this.productsRepository.save(product);

    // Si se proporcionan sizes, actualizar las relaciones
    if (sizes) {
      // Eliminar relaciones existentes
      await this.productSizeRepository.delete({ product: { id } });

      // Crear nuevas relaciones
      for (const sizeData of sizes) {
        const size = await this.sizesRepository.findOne({
          where: { id: sizeData.sizeId },
        });
        if (!size) {
          throw new NotFoundException(`Size with ID ${sizeData.sizeId} not found`);
        }

        const productSize = this.productSizeRepository.create({
          product: product,
          size: size,
          price: sizeData.price,
        });
        await this.productSizeRepository.save(productSize);
      }
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
  }
}
