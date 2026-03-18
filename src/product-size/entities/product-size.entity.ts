import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { Size } from '../../sizes/entities/size.entity';

@Entity()
export class ProductSize {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @ManyToOne(() => Product, (product) => product.productSizes)
  product: Product;

  @ManyToOne(() => Size, (size) => size.productSizes)
  size: Size;
}
